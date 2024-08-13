import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import * as crypto from "crypto";
import configs from "@/src/config";

const region = configs.region;

const cognitoClient = new CognitoIdentityProviderClient({ region });

const generateSecretHash = (username: string) => {
  return crypto
    .createHmac("sha256", configs.cognitoAppCientSecret)
    .update(username + configs.cognitoAppCientId)
    .digest("base64");
};

export const signUpUser = async (
  username: string,
  password: string,
  attributes: { name: string; phoneNumber?: string; email?: string },
) => {
  const secretHash = generateSecretHash(username);
  const userAttributes = [
    {
      Name: "name",
      Value: attributes.name,
    },
  ];

  if (attributes.phoneNumber) {
    userAttributes.push({
      Name: "phone_number",
      Value: attributes.phoneNumber,
    });
  }

  if (attributes.email) {
    userAttributes.push({
      Name: "email",
      Value: attributes.email,
    });
  }

  const command = new SignUpCommand({
    ClientId: configs.cognitoAppCientId,
    Username: username,
    Password: password,
    SecretHash: secretHash,
    UserAttributes: userAttributes,
  });

  try {
    const response = await cognitoClient.send(command);
    return {
      message:
        "Sign up successful. Please check your phone or email for verification.",
      userSub: response.UserSub,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyUser = async (username: string, code: string) => {
  const secretHash = generateSecretHash(username);
  const command = new ConfirmSignUpCommand({
    ClientId: configs.cognitoAppCientId,
    Username: username,
    ConfirmationCode: code,
    SecretHash: secretHash,
  });

  try {
    const response = await cognitoClient.send(command);
    return { message: "User verified successfully.", response };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signInUser = async (username: string, password: string) => {
  const secretHash = generateSecretHash(username);

  const command = new InitiateAuthCommand({
    ClientId: configs.cognitoAppCientId,
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  });

  try {
    const response = await cognitoClient.send(command);
    const authResult = response.AuthenticationResult;

    // Return a success message along with the authentication result
    return {
      message: "Sign-in successful!",
      authResult,
    };
  } catch (error: any) {
    if (error.name === "NotAuthorizedException") {
      throw new Error("The username or password is incorrect.");
    } else if (error.name === "UserNotConfirmedException") {
      throw new Error("The user has not been confirmed.");
    } else if (error.name === "PasswordResetRequiredException") {
      throw new Error("A password reset is required.");
    } else {
      throw new Error(error.message);
    }
  }
};
