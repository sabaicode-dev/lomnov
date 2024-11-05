import configs from "@/src/config";
import axios from "axios";
import { GoogleCallBackRequest } from "../controllers/types/social-auth.type";
import { CognitoToken } from "./types/social-auth.type";
import { InvalidInputError } from "../utils/error/customErrors";
import { jwtDecode } from "jwt-decode";
import {
    AdminAddUserToGroupCommand,
    AdminLinkProviderForUserCommand,
    AdminUpdateUserAttributesCommand,
    CognitoIdentityProviderClient,
    ListUsersCommand,
    AdminListGroupsForUserCommand,
    UserType,
    AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
    region: configs.awsCognitoRegion,
    credentials: {
        accessKeyId: configs.awsAccessKeyId,
        secretAccessKey: configs.awsSecretAccessKey,
    },
});

class SocialAuthService {
    private awsCognitoDomain(endpoint: string = '') {
        return `${configs.awsCognitoDomain}${endpoint}`;
    }

    public loginWithGoogle(state: string = "user"): string {
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: configs.awsCognitoClientId,
            redirect_uri: configs.awsRedirectUri,
            identity_provider: 'Google',
            scope: 'openid profile email',
            state: state!,
            prompt: 'select_account',
        });
        return this.awsCognitoDomain(`/oauth2/authorize?${params.toString()}`);
    }

    public async getOAuthToken(query: GoogleCallBackRequest): Promise<CognitoToken> {
        try {
            const { code, error, state } = query;
            if (error || !code) {
                throw new InvalidInputError();
            }

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${configs.awsCognitoClientId}:${configs.awsCognitoClientSecret}`).toString('base64')}`,
            };
            const params = new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: configs.awsCognitoClientId,
                redirect_uri: configs.awsRedirectUri,
                code: code,
            });

            // Get the token from Cognito
            const cognitoDomain = this.awsCognitoDomain(`/oauth2/token`);
            const response = await axios.post(cognitoDomain, params.toString(), { headers });
            const token = {
                accessToken: response.data.access_token,
                idToken: response.data.id_token,
                refreshToken: response.data.refresh_token,
            };
            console.log(token)
            const userInfo = this.getUserInfoFromToken(token.idToken);
            console.log("USER INFO:: ",userInfo);
            
            //@ts-ignore
            const email = userInfo.email;
            const existingUser = await this.getUserByEmail(email);
            let userId: string;
            console.log("Existing USER::: ", existingUser);
            // if user exist and user signin with manual 
            if (existingUser && existingUser.UserStatus !== 'EXTERNAL_PROVIDER') {
                await this.linkOrSyncUser(existingUser, userInfo, state!);
                userId = existingUser.Username!;
            } else {
                // else , create store user in db 
                console.log("UserInfo.sub:: ", userInfo.sub);
                userId = await this.createNewUser(userInfo, state!);
            }
            return {
                accessToken: token.accessToken,
                idToken: token.idToken,
                refreshToken: token.refreshToken,
                username: userInfo.sub,
                userId: userId,
            };
        } catch (error) {
            console.error("Get OAuth Token Error::: ", error);
            throw error;
        }
    }

    public getUserInfoFromToken(token: string) {
        const decodeToken = jwtDecode(token);
        return decodeToken;
    }

    async getUserByEmail(email: string): Promise<UserType | undefined> {
        const params = {
            Filter: `email = "${email}"`,
            UserPoolId: configs.awsCognitoUserPoolId,
            Limit: 1,
        };
        try {
            const listUserCommand = new ListUsersCommand(params);
            const response = await client.send(listUserCommand);
            return response.Users && response.Users[0];
        } catch (error) {
            console.error("AuthService getUserByEmail() method error:", error);
            throw error;
        }
    }

    async linkAccount({
        sourceUserId,
        providerName,
        destinationUserId,
    }: {
        sourceUserId: string;
        providerName: string;
        destinationUserId: string;
    }): Promise<void> {
        const params = {
            DestinationUser: {
                ProviderName: 'Cognito',
                ProviderAttributeValue: destinationUserId,
            },
            SourceUser: {
                ProviderName: providerName,
                ProviderAttributeName: "Cognito_Subject",
                ProviderAttributeValue: sourceUserId,
            },
            UserPoolId: configs.awsCognitoUserPoolId,
        };
        try {
            const command = new AdminLinkProviderForUserCommand(params);
            await client.send(command);
        } catch (error) {
            console.error(`AuthService linkAccount() method error: `, error);
            throw error;
        }
    }

    async updateUserCongitoAttributes(username: string, attributes: { [key: string]: string }): Promise<void> {
        try {
            const getUserCommand = new AdminGetUserCommand({
                Username: username,
                UserPoolId: configs.awsCognitoUserPoolId,
            });
            await client.send(getUserCommand);

            const params = {
                Username: username,
                UserPoolId: configs.awsCognitoUserPoolId,
                UserAttributes: Object.entries(attributes).map(([key, value]) => ({ Name: key, Value: value })),
            };
            const command = new AdminUpdateUserAttributesCommand(params);
            await client.send(command);
        } catch (error) {
            //@ts-ignore
            if (error.name === 'UserNotFoundException') {
                console.error(`User with username ${username} does not exist in Cognito.`);
            } else {
                console.error("AuthService updateUserCongitoAttributes() method error:", error);
                throw error;
            }
        }
    }

    async checkUserInGroup(username: string, groupName: string): Promise<boolean> {
        try {
            const params = {
                Username: username,
                UserPoolId: configs.awsCognitoUserPoolId,
            };
            const command = new AdminListGroupsForUserCommand(params);
            const response = await client.send(command);
            return response.Groups?.some(group => group.GroupName === groupName) || false;
        } catch (error) {
            console.error(`Error checking if user ${username} is in group ${groupName}:`, error);
            throw error;
        }
    }

    async addToGroup(username: string, groupName: string) {
        const params = {
            GroupName: groupName, /* required */
            UserPoolId: configs.awsCognitoUserPoolId, /* required */
            Username: username /* required */
        };
        console.log("Params Add User To Group:: ",params);
        try {
            const command = new AdminAddUserToGroupCommand(params);
            await client.send(command);
            console.log(`AuthService: User ${username} added to ${groupName} group`);
        } catch (error) {
            console.error(`Error adding user ${username} to group ${groupName}:`, error);
            throw error;
        }
    }

    async linkOrSyncUser(existingUser: UserType, userInfo: any, state: string): Promise<void> {
        const isLinked = existingUser.Attributes?.some(attr => attr.Name === 'identities' && attr.Value?.includes("Google"));
        if (!isLinked) {
            await this.linkAccount({
                sourceUserId: userInfo.sub!,
                providerName: 'Google',
                destinationUserId: existingUser.Username!,
            });
        }
        await this.updateUserCongitoAttributes(existingUser.Username!, { 'custom:roles': state });
    }

    async createNewUser(userInfo: any, _groupName: string): Promise<string> {
        try {
            const user = await axios.post(`${configs.userServiceUrl}/api/v1/users`, {
                cognitoSub: userInfo.sub,
                email: userInfo.email,
                userName: userInfo.name,
                profile: userInfo.profile,
            });

            // Assuming the user is created in your database successfully
            //const cognitoUsername = userInfo.sub!; // Ensure this is the correct identifier for Cognito
           // await this.addToGroup(cognitoUsername, groupName);
           // console.log(`User ${cognitoUsername} added to group ${groupName}`);
            return user.data._id;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                const existingUserResponse = await axios.get(`${configs.userServiceUrl}/api/v1/users/${userInfo.sub}`);
                return existingUserResponse.data._id;
            } else {
                throw error;
            }
        }
    }
    async refreshToken():Promise<void>{
        
    }
}

export default SocialAuthService;
