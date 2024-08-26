import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  AdminGetUserCommand,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import * as crypto from "crypto";
import configs from "../config";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/src/utils/error/customErrors";
import {
  ConfirmPasswordResetRequest,
  ConfirmPasswordResetResponse,
  InitiatePasswordResetRequest,
  InitiatePasswordResetResponse,
  SignInRequest,
  SignInUserResponse,
  // SignInUserResponse,
  SignUpUserRequest,
  SignUpUserResponse,
  VerifyRequest,
  VerifyUserResponse,
} from "@/src/utils/types/indext";
// =====================================================

export class CognitoService {
  private cognitoClient: CognitoIdentityProviderClient;
  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: configs.awsRegion,
    });
  }

  private generateSecretHash(username: string): string {
    return crypto
      .createHmac("sha256", configs.cognitoAppCientSecret)
      .update(username + configs.cognitoAppCientId)
      .digest("base64");
  }

  public async signUpUser(
    request: SignUpUserRequest,
  ): Promise<SignUpUserResponse> {
    const secretHash = this.generateSecretHash(request.username);
    const userAttributes = [
      {
        Name: "name",
        Value: request.attributes.name,
      },
    ];

    if (request.attributes.phoneNumber) {
      userAttributes.push({
        Name: "phone_number",
        Value: request.attributes.phoneNumber,
      });
    }

    if (request.attributes.email) {
      userAttributes.push({
        Name: "email",
        Value: request.attributes.email,
      });
    }

    if (request.attributes["custom:roles"]) {
      userAttributes.push({
        Name: "custom:roles",
        Value: request.attributes["custom:roles"],
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
        Username: request.username,
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
    requestBody: VerifyRequest,
  ): Promise<VerifyUserResponse> {
    const secretHash = this.generateSecretHash(requestBody.username);
    const confirmCommand = new ConfirmSignUpCommand({
      ClientId: configs.cognitoAppCientId,
      Username: requestBody.username,
      ConfirmationCode: requestBody.code,
      SecretHash: secretHash,
    });

    try {
      await this.cognitoClient.send(confirmCommand);
      const getUserCommand = new AdminGetUserCommand({
        UserPoolId: configs.userPoolId,
        Username: requestBody.username,
      });

      const userResponse = await this.cognitoClient.send(getUserCommand);
      if (!userResponse) {
        throw new NotFoundError(
          `User with username ${requestBody.username} not found.`,
        );
      }
      const userAttributes = userResponse.UserAttributes || [];

      const roleAttribute = userAttributes.find(
        (attr) => attr.Name === "custom:roles",
      );
      if (!roleAttribute || !roleAttribute.Value) {
        // If the "custom:roles" attribute is not found or has no value, throw an error
        throw new BadRequestError(
          `Role attribute "custom:roles" is missing or undefined for user ${requestBody.username}.`,
        );
      }
      const role = roleAttribute ? roleAttribute.Value : "user";

      const groupName = role === "admin" ? "admin" : "user";
      const addToGroupCommand = new AdminAddUserToGroupCommand({
        UserPoolId: configs.userPoolId,
        Username: requestBody.username,
        GroupName: groupName,
      });
      if (!addToGroupCommand) {
        throw new InternalServerError(
          `Failed to add user ${requestBody.username} to group ${groupName}.`,
        );
      }

      await this.cognitoClient.send(addToGroupCommand);
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
    requestBody: SignInRequest,
  ): Promise<SignInUserResponse> {
    // Input validation
    if (!requestBody.username || !requestBody.password) {
      throw new ValidationError("Username, and password are required.");
    }
    const secretHash = this.generateSecretHash(requestBody.username);
    const command = new InitiateAuthCommand({
      ClientId: configs.cognitoAppCientId,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: requestBody.username,
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
      response.AuthenticationResult;
      return {
        message: "Sign-in successful!",
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

  public async initiatePasswordReset(
    requestBody: InitiatePasswordResetRequest,
  ): Promise<InitiatePasswordResetResponse> {
    // Input validation
    if (!requestBody.username)
      throw new ValidationError("Username is required.");
    const secretHash = this.generateSecretHash(requestBody.username);
    const command = new ForgotPasswordCommand({
      ClientId: configs.cognitoAppCientId,
      Username: requestBody.username,
      SecretHash: secretHash,
    });

    try {
      await this.cognitoClient.send(command);
      return {
        message: `Password reset initiated. Please check your email or phone for the code. (${requestBody.username})`,
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
    requestBody: ConfirmPasswordResetRequest,
  ): Promise<ConfirmPasswordResetResponse> {
    // Input validation
    if (
      !requestBody.username ||
      !requestBody.newPassword ||
      !requestBody.confirmationCode
    ) {
      throw new ValidationError(
        "Username, new password, and confirmation code are required.",
      );
    }
    const secretHash = this.generateSecretHash(requestBody.username);
    const command = new ConfirmForgotPasswordCommand({
      ClientId: configs.cognitoAppCientId,
      Username: requestBody.username,
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
}
