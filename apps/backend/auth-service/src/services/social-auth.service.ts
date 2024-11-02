import crypto from "crypto"
import configs from "@/src/config";
import axios from "axios";
import { GoogleCallBackRequest } from "../controllers/types/social-auth.type";
import { CognitoToken } from "./types/social-auth.type";
import { InvalidInputError } from "../utils/error/customErrors";
import { jwtDecode } from "jwt-decode";
import { AdminAddUserToGroupCommand, AdminGetUserCommand, AdminLinkProviderForUserCommand, AdminUpdateUserAttributesCommand, CognitoIdentityProviderClient, ListUsersCommand, UserType } from "@aws-sdk/client-cognito-identity-provider";
const client = new CognitoIdentityProviderClient({
    region: configs.awsCognitoRegion, credentials: {
        accessKeyId: configs.awsAccessKeyId,
        secretAccessKey: configs.awsSecretAccessKey
    }
})
class SocialAuthService {
    /**
     * Generate Random Byes
     */
    private generatedRandomBytes(): string {
        return crypto.randomBytes(16).toString("hex");
    }
    /**
     * Provive a domain of cognito that accept 1 param as a end point
     */
    private awsCognitoDomain(endpiont: string = '') {
        return `${configs.awsCognitoDomain}${endpiont}`
    }
    public loginWithGoogle(state: string = this.generatedRandomBytes()): string {

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: configs.awsCognitoClientId,
            redirect_uri: configs.awsRedirectUri,
            identity_provider: 'Google',
            scope: 'openid profile email',
            state: state!,
            prompt: 'select_account',
        })
        return this.awsCognitoDomain(`/oauth2/authorize?${params.toString()}`)
    }
    public async getOAuthToken(query: GoogleCallBackRequest): Promise<CognitoToken> {
        try {
            const { code, error, state } = query;
            if (error || !code) {
                throw new InvalidInputError()
            }
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${configs.awsCognitoClientId}:${configs.awsCognitoClientSecret}`).toString('base64')}`,
            }
            const params = new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: configs.awsCognitoClientId,
                redirect_uri: configs.awsRedirectUri,
                code: code,
            });
            // Get the token from cognito
            const cognitoDomain = this.awsCognitoDomain(`/oauth2/token`);
            const response = await axios.post(cognitoDomain, params.toString(), { headers });
            const token = {
                accessToken: response.data.access_token,
                idToken: response.data.id_token,
                refreshToken: response.data.refresh_token,
            }
            // Get the user infor from token
            const userInfo = this.getUserInfoFromToken(token.idToken);
            //@ts-ignore
            const email = userInfo.email;
            const existingUser = await this.getUserByEmail(email);
            console.log("existing user: ", existingUser);
            let userId: string;
            // Step 3: Case User is already signin with email | phone number & password , but they try to signin with google | facebook
            if (existingUser && existingUser.UserStatus !== 'EXTERNAL_PROVIDER') {
                const isLinked = existingUser.Attributes?.some((attr) => attr.Name === 'identities' && attr.Value?.includes("Google"));
                if (!isLinked) {
                    // Step 3.1 Link the user to the existing Cognito user if not already linked
                    await this.linkAccount({
                        sourceUserId: userInfo.sub!,
                        providerName: 'Google',
                        destinationUserId: existingUser.Username!
                    });
                    // Step 3.2: Update user info in user service
                    const user = await axios.put(`${configs.userServiceUrl}/api/v1/users/${existingUser.Username}`, {
                        googleSub: userInfo.sub,
                        role: state
                    })
                    // Step 3.3: Update user info in Cognito
                    await this.updateUserCongitoAttributes(existingUser.Username!, {
                        'custom:role': state!
                    });
                    userId = user.data.data._id;
                } else {
                    const user = await axios.get(`${configs.userServiceUrl}/api/v1/users/${existingUser.Username}`);
                    userId = user.data.data._id;
                }
            } else {
                // Step 4: Case User is never signin with Google | Facebook
                try {
                    const user = await axios.post(`${configs.userServiceUrl}/api/v1/users`, {
                        googleSub: userInfo.sub,
                        email,
                        //@ts-ignore
                        username: userInfo.name,
                        //@ts-ignore
                        profile: userInfo.profile,
                        role: state
                    });
                    // Step 4.1: Update user info in Cognito
                    await this.updateUserCongitoAttributes(userInfo.sub!, { 'custom:role': state! });
                    userId = user.data.data._id;
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response?.status === 409) {
                        console.log("User already exists in user service, retrieving existing user info.");
                        const existingUserResponse = await axios.get(`${configs.userServiceUrl}/api/v1/users/${userInfo.sub}`);
                        userId = existingUserResponse.data.data._id;
                    } else {
                        throw error;// Re-throw if it's a different error
                    }
                }
            }
            // Step 5: Check if the user is already in the group before adding
            const groupExists = await this.checkUserInGroup(userInfo.sub!, state!);
            if(!groupExists){
                await this.addToGroup(userInfo.sub!,state!);
                console.log(`User ${userInfo.sub} added to group ${state}`);
            }
            return {
                accessToken: token.accessToken,
                idToken: token.idToken,
                refreshToken: token.refreshToken,
                username: userInfo.sub,
                userId
            }
        } catch (error) {
            console.error("Get OAuth Token Error::: ", error)
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
            Limit: 1
        }
        try {
            const listUserCommand = new ListUsersCommand(params);
            const response = await client.send(listUserCommand);
            return response.Users && response.Users[0];
        } catch (error) {
            console.error("AuthService getUserByEmail() method error:", error);
            throw error;
        }
    }
    async linkAccount({ sourceUserId, providerName, destinationUserId }: { sourceUserId: string, providerName: string, destinationUserId: string }): Promise<void> {
        const params = {
            // DestinationUser is the existing cognito user that you want to assign to the external Idp user account (COULD BE a cognito user or a federated user)
            DestinationUser: {
                ProviderName: 'Cognito',
                ProviderAttributeValue: destinationUserId,
            },
            // SourceUser is the user who is linking to the destination user (MUST BE a federated user like Google or Facebook, etc.)
            SourceUser: {
                ProviderName: providerName,
                ProviderAttributeName: "Cognito_Subject",
                ProviderAttributeValue: sourceUserId
            },
            UserPoolId: configs.awsCognitoUserPoolId
        }
        try {
            const command = new AdminLinkProviderForUserCommand(params)
            await client.send(command)
        } catch (error) {
            console.error(`AuthService linkAccount() method error: `, error);
            throw error;
        }
    }
    async updateUserCongitoAttributes(username: string, attributes: { [key: string]: string }): Promise<void> {
        const params = {
            Username: username,
            UserPoolId: configs.awsCognitoUserPoolId,
            UserAttributes: Object.entries(attributes).map(([key, value]) => ({ Name: key, Value: value }))
        }
        try {
            const command = new AdminUpdateUserAttributesCommand(params);
            await client.send(command);
        } catch (error) {
            console.error("AuthService updateUserCongitoAttributes() method error:", error);
            throw error;
        }
    }
    async checkUserInGroup(username: string, groupName: string): Promise<boolean | undefined> {
        try {
            const params = {
                GroupName: groupName,
                Username: username,
                UserPoolId: configs.awsCognitoUserPoolId
            };
            const command = new AdminGetUserCommand(params);
            const user = await client.send(command);
            return user.UserAttributes?.map((attr) => attr.Value).includes(groupName);
        } catch (error) {
            console.error(`Error checking if user ${username} is in group ${groupName}:`, error);
            throw error;
        }
    }
    async addToGroup(username:string,groupName:string){
        const params = {
            GroupName: groupName,
            Username: username,
            UserPoolId: configs.awsCognitoUserPoolId
        };
        try {
            const command = new AdminAddUserToGroupCommand(params);
            await client.send(command);
            console.log(`AuthService verifyUser() method: User added to ${groupName} group`);
        } catch (error) {
            throw error;
        }
    }
}
export default SocialAuthService;