import * as crypto from "crypto";
import { jwtDecode } from "jwt-decode";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import {
  JwtPayload,
  ResponseChangeNewPasswordDTO,
} from "@/src/utils/types/indext";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  AdminGetUserCommand,
  AdminAddUserToGroupCommand,
  AdminDeleteUserCommand,
  ChangePasswordCommand,
  AdminUpdateUserAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import configs from "@/src/config";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/src/utils/error/customErrors";
import {
  RequestConfirmPasswordResetDTO,
  ResponseConfirmPasswordResetDTO,
  RequestInitiatePasswordResetDTO,
  ResponseInitiatePasswordReset,
  RequestSignInDTO,
  ResponseSignInUserDTO,
  RequestSignUpUserDTO,
  ResponseSignUpUserDTO,
  RequestVerifyDTO,
  ResponseVerifyUserDTO,
} from "@/src/utils/types/indext";
import axios from "axios";
import setCookie from "../middlewares/cookies";
// =====================================================

export class CognitoService {
  private cognitoClient: CognitoIdentityProviderClient;
  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: configs.awsRegion,
    });
  }

  private generateSecretHash(username: string | undefined): string {
    return crypto
      .createHmac("sha256", configs.cognitoAppCientSecret)
      .update(username + configs.cognitoAppCientId)
      .digest("base64");
  }

  public async signUpUser(
    request: RequestSignUpUserDTO,
  ): Promise<ResponseSignUpUserDTO> {
    const secretHash = this.generateSecretHash(request.email);
    const userAttributes = [
      {
        Name: "name",
        Value: request.username,
      },
    ];
    if (request.email) {
      userAttributes.push({
        Name: "email",
        Value: request.email,
      });
    }

    if (request.role) {
      userAttributes.push({
        Name: "custom:roles",
        Value: request.role,
      });
    }

    try {
      // Validate that configurations and parameters are correct
      if (!configs.cognitoAppCientId) {
        throw new ValidationError("ClientId is missing in configuration.");
      }
      if (userAttributes.length === 0) {
        throw new ValidationError("User attributes must not be empty.");
      }
      const command = new SignUpCommand({
        ClientId: configs.cognitoAppCientId,
        Username: request.email,
        Password: request.password,
        SecretHash: secretHash,
        UserAttributes: userAttributes,
      });
      if (!command) {
        throw new InternalServerError("Failed to create the sign-up command.");
      }

      const response = await this.cognitoClient.send(command);

      // Validate response
      if (!response || !response.UserSub) {
        throw new InternalServerError("UserSub is missing from the response.");
      }
      return {
        message:
          "Sign up successful. Please check your phone or email for verification.",
        userSub: response.UserSub,
      };
    } catch (error: any) {
      if (
        error instanceof InternalServerError ||
        error instanceof ValidationError
      ) {
        // Re-throw known (inspectable) errors
        throw error;
      } else {
        // Handle uninspectable (unexpected) errors and include original error message and status
        throw new InternalServerError(
          `An unexpected error occurred: ${error.message}`,
        );
      }
    }
  }

  public async verifyUser(
    requestBody: RequestVerifyDTO,
  ): Promise<ResponseVerifyUserDTO> {
    const secretHash = this.generateSecretHash(requestBody.email);
    const confirmCommand = new ConfirmSignUpCommand({
      ClientId: configs.cognitoAppCientId,
      Username: requestBody.email,
      ConfirmationCode: requestBody.code,
      SecretHash: secretHash,
    });

    try {
      await this.cognitoClient.send(confirmCommand);
      const getUserCommand = new AdminGetUserCommand({
        UserPoolId: configs.userPoolId,
        Username: requestBody.email,
      });

      const userResponse = await this.cognitoClient.send(getUserCommand);
      if (!userResponse) {
        throw new NotFoundError(
          `User with username ${requestBody.email} not found.`,
        );
      }
      const userAttributes = userResponse.UserAttributes || [];

      const roleAttribute = userAttributes.find(
        (attr) => attr.Name === "custom:roles",
      );
      if (!roleAttribute || !roleAttribute.Value) {
        // If the "custom:roles" attribute is not found or has no value, throw an error
        throw new BadRequestError(
          `Role attribute "custom:roles" is missing or undefined for user ${requestBody.email}.`,
        );
      }
      const role = roleAttribute ? roleAttribute.Value : "user";

      const groupName = role === "admin" ? "admin" : "user";
      const addToGroupCommand = new AdminAddUserToGroupCommand({
        UserPoolId: configs.userPoolId,
        Username: requestBody.email,
        GroupName: groupName,
      });
      if (!addToGroupCommand) {
        throw new InternalServerError(
          `Failed to add user ${requestBody.email} to group ${groupName}.`,
        );
      }

      await this.cognitoClient.send(addToGroupCommand);
      // Prepare user payload for database insertion
      const userPayload = {
        cognitoSub: userResponse.Username, // Use Username for cognitoSub
        email: requestBody.email,
        userName: userResponse.UserAttributes?.find(attr => attr.Name === 'name')?.Value || '',
      };

      // Insert user information into the database
      await axios.post(`${configs.userServiceDomain}/api/v1/users`, userPayload);
      return { message: "User verified and added to group successfully." };
    } catch (error: any) {
      if (
        error instanceof InternalServerError ||
        error instanceof NotFoundError ||
        error instanceof BadRequestError
      ) {
        // Re-throw known (inspectable) errors
        throw error;
      } else {
        // Handle uninspectable (unexpected) errors and include original error message and status
        throw new InternalServerError(
          `An unexpected error occurred: ${error.message}`,
        );
      }
    }
  }

  public async signInUser(
    requestBody: RequestSignInDTO,
  ): Promise<ResponseSignInUserDTO> {
    // Input validation
    if (!requestBody.email || !requestBody.password) {
      throw new ValidationError("Username, and password are required.");
    }
    const secretHash = this.generateSecretHash(requestBody.email);
    const command = new InitiateAuthCommand({
      ClientId: configs.cognitoAppCientId,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: requestBody.email,
        PASSWORD: requestBody.password,
        SECRET_HASH: secretHash,
      },
    });

    try {
      const response = await this.cognitoClient.send(command);
      // Check if the response and AuthenticationResult are valid
      if (!response || !response.AuthenticationResult) {
        throw new InternalServerError(
          "Authentication result is missing from the response.",
        );
      }
      const authResult = response.AuthenticationResult;
      const decodedToken = jwtDecode<JwtPayload>(authResult.AccessToken!);
      const extractedUsername = decodedToken.sub;
      return {
        message: "Sign-in successful!",
        authResult,
        username: extractedUsername,
      };
    } catch (error: any) {
      if (error instanceof InternalServerError) {
        throw error;
      } else {
        throw new InternalServerError(
          `An unexpected error occurred: ${error.message}`,
        );
      }
    }
  }

  public async changeUserPassword(
    accessToken: string,
    previousPassword: string,
    proposedPassword: string,
  ): Promise<ResponseChangeNewPasswordDTO> {
    const command = new ChangePasswordCommand({
      AccessToken: accessToken,
      PreviousPassword: previousPassword,
      ProposedPassword: proposedPassword,
    });

    try {
      await this.cognitoClient.send(command);
      return { message: "Password changed successfully." };
    } catch (error: any) {
      throw error;
    }
  }

  public async initiatePasswordReset(
    requestBody: RequestInitiatePasswordResetDTO,
  ): Promise<ResponseInitiatePasswordReset> {
    // Input validation
    if (!requestBody.email) throw new ValidationError("Username is required.");
    const secretHash = this.generateSecretHash(requestBody.email);
    const command = new ForgotPasswordCommand({
      ClientId: configs.cognitoAppCientId,
      Username: requestBody.email,
      SecretHash: secretHash,
    });

    try {
      await this.cognitoClient.send(command);
      return {
        message: `Password reset initiated. Please check your email or phone for the code. (${requestBody.email})`,
      };
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw error;
      } else {
        throw new InternalServerError(` ${error.message}`);
      }
    }
  }

  public async confirmPasswordReset(
    requestBody: RequestConfirmPasswordResetDTO,
  ): Promise<ResponseConfirmPasswordResetDTO> {
    // Input validation
    if (
      !requestBody.email ||
      !requestBody.newPassword ||
      !requestBody.confirmationCode
    ) {
      throw new ValidationError(
        "Username, new password, and confirmation code are required.",
      );
    }
    const secretHash = this.generateSecretHash(requestBody.email);
    const command = new ConfirmForgotPasswordCommand({
      ClientId: configs.cognitoAppCientId,
      Username: requestBody.email,
      Password: requestBody.newPassword,
      ConfirmationCode: requestBody.confirmationCode,
      SecretHash: secretHash,
    });
    if (!command) {
      throw new InternalServerError(
        "Failed to create the ConfirmForgotPassword command.",
      );
    }

    try {
      await this.cognitoClient.send(command);
      return { message: "Password reset successfully." };
    } catch (error: any) {
      if (
        error instanceof ValidationError ||
        error instanceof InternalServerError
      ) {
        throw error;
      } else {
        throw new InternalServerError(
          `An unexpected error occurred: ${error.message}`,
        );
      }
    }
  }

  public async refreshTokens(
    refreshToken: string,
    username: string,
  ): Promise<ResponseVerifyUserDTO> {
    try {
      const secretHash = this.generateSecretHash(username);
      const command = new InitiateAuthCommand({
        ClientId: configs.cognitoAppCientId,
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
          SECRET_HASH: secretHash,
        },
      });
      const response = await this.cognitoClient.send(command);

      // Check if the response and AuthenticationResult are valid
      if (!response?.AuthenticationResult) {
        throw new InternalServerError(
          "Authentication result is missing from the response.",
        );
      }

      const authResult = response.AuthenticationResult;

      return {
        message: "Token refresh successful!",
        authResult,

      };
    } catch (error: any) {
      if (error instanceof InternalServerError) {
        throw error;
      } else {
        throw new InternalServerError(
          `An unexpected error occurred: ${error.message}`,
        );
      }
    }
  }

  public async deleteUser(cognitoUserSub: string): Promise<void> {
    const params = {
      UserPoolId: configs.userPoolId, // The user pool ID for the user pool where you want to delete the user
      Username: cognitoUserSub, // The username (in this case, the Cognito user sub)
    };

    try {
      const command = new AdminDeleteUserCommand(params);
      await this.cognitoClient.send(command);
    } catch (error: any) {
      throw new InternalServerError(error.message);
    }
  }

  public async getTokens(code: string): Promise<any> {
    try {
      const authorizationHeader = `Basic ${Buffer.from(
        `${configs.cognitoAppCientId}:${configs.cognitoAppCientSecret}`,
      ).toString("base64")}`;
      const params = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: configs.cognitoAppCientId,
        redirect_uri: configs.redirect_uri,
      });
      const response = await axios.post(
        `${configs.cognitoAppDomain}/oauth2/token`,
        params,
        {
          headers: {
            Authorization: authorizationHeader,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async verifyIdToken(idToken: string): Promise<any> {
    try {
      const verifier = CognitoJwtVerifier.create({
        userPoolId: configs.userPoolId,
        tokenUse: "id",
        clientId: configs.cognitoAppCientId,
      });
      return await verifier.verify(idToken);
    } catch (error) {
      throw error;
    }
  }

  public async getUserAttributes(username: string): Promise<any> {
    try {
      const getUserCommand = new AdminGetUserCommand({
        UserPoolId: configs.userPoolId,
        Username: username,
      });
      return await this.cognitoClient.send(getUserCommand);
    } catch (error) {
      throw error;
    }
  }

  public async updateUserRole(username: string, role: string): Promise<void> {
    try {
      const updateCommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: configs.userPoolId,
        Username: username,
        UserAttributes: [
          {
            Name: "custom:roles",
            Value: role,
          },
        ],
      });
      await this.cognitoClient.send(updateCommand);
    } catch (error) {
      throw error;
    }
  }

  public async addUserToGroup(
    username: string,
    groupName: string,
  ): Promise<void> {
    try {
      const addToGroupCommand = new AdminAddUserToGroupCommand({
        UserPoolId: configs.userPoolId,
        Username: username,
        GroupName: groupName,
      });
      await this.cognitoClient.send(addToGroupCommand);
    } catch (error) {
      throw error;
    }
  }

  public async handleCallback(code: string, res: any): Promise<void> {
    try {
      const data = await this.getTokens(code);
      if (!data.access_token || !data.id_token) {
        throw new ValidationError("Failed to retrieve tokens");
      }
      // Set cookies for tokens
      setCookie(res, "accessToken", data.access_token)
      setCookie(res, "idToken", data.id_token)
      setCookie(res, "refreshToken", data.refresh_token)
      // res.cookie("accessToken", data.access_token);
      // res.cookie("idToken", data.id_token);
      // res.cookie("refreshToken", data.refresh_token);

      // Verify and decode the ID token
      const payload = await this.verifyIdToken(data.id_token);
      const username = payload.sub; // Extract the username
      setCookie(res, "username", username)

      const email = payload.email;
      if (!username) {
        throw new Error("Username not found in token");
      }

      // Get user attributes
      const userAttributes = await this.getUserAttributes(username);
      let roleAttribute = userAttributes.UserAttributes?.find(
        (attr: any) => attr.Name === "custom:roles",
      );

      if (!roleAttribute) {
        // Set default role
        await this.updateUserRole(username, "user");

        // Re-fetch attributes to determine role
        const updatedUserAttributes = await this.getUserAttributes(username);
        roleAttribute = updatedUserAttributes.UserAttributes?.find(
          (attr: any) => attr.Name === "custom:roles",
        );
      }

      const role = roleAttribute ? roleAttribute.Value : "user";
      // Add user to the appropriate group
      const groupName = role === "admin" ? "admin" : "user";
      await this.addUserToGroup(username, groupName);
      // Step 5: Insert user into database
      const userPayload = {
        cognitoSub: username, // Cognito user ID
        email: email,
        userName: payload['preferred_username'] || payload['name'], // Adjust based on available fields
      };

      await axios.post(
        `${configs.userServiceDomain}/api/v1/users`,
        userPayload
      );

    } catch (error) {
      throw error;
    }
  }


}
