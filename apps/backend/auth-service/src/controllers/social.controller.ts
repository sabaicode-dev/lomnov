declare module "express-session" {
  interface Session {
    state?: string;
  }
}

import { Controller, Get, Route, Request, Res, TsoaResponse } from "tsoa";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { randomBytes } from "crypto";
import axios from "axios";
import configs from "../config";

import { Request as ExRequest } from "express";
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminUpdateUserAttributesCommand,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
const cognitoClient = new CognitoIdentityProviderClient({
  region: configs.awsRegion,
});
@Route("api/v1/auth")
export class AuthController extends Controller {
  @Get("/google-sign-in")
  public async googleSignIn(
    @Request() request: ExRequest,
    @Res() redirect: TsoaResponse<302, void>,
  ): Promise<void> {
    const state = randomBytes(16).toString("hex");
    request.session.state = state; // Store state in session
    console.log(`Generated state: ${state}`);
    const authorizeParams = new URLSearchParams({
      response_type: "code",
      client_id: configs.cognitoAppCientId, // Your Cognito app client ID
      redirect_uri: configs.redirect_uri, // Your app's callback URL
      state: state,
      identity_provider: "Google",
      scope: "profile email openid",
    });

    redirect(302, undefined, {
      Location: `${
        configs.cognitoAppDomain
      }/oauth2/authorize?${authorizeParams.toString()}`,
    });
  }

  @Get("/facebook-sign-in")
  public async facebookSignIn(
    @Request() request: ExRequest,
    @Res() redirect: TsoaResponse<302, void>,
  ): Promise<void> {
    try {
      // Generate a random state value
      const state = randomBytes(16).toString("hex");
      request.session.state = state; // Store the state in session securely
      console.log(`Generated state: ${state}`);

      // Construct the URL for Cognito OAuth2 authorization
      const authorizeParams = new URLSearchParams({
        response_type: "code",
        client_id: configs.cognitoAppCientId, // Replace with your Cognito app client ID
        redirect_uri: configs.redirect_uri, // Replace with your app's callback URL
        identity_provider: "Facebook",
        scope: "profile email openid",
      });

      // Construct the full redirect URL
      const redirectUrl = `${
        configs.cognitoAppDomain
      }/oauth2/authorize?${authorizeParams.toString()}`;
      console.log(`Redirecting to: ${redirectUrl}`);

      // Redirect the user to the Cognito authorization URL
      redirect(302, undefined, { Location: redirectUrl });
    } catch (error) {
      console.error("Error during Facebook sign-in:", error);
      // You might want to handle the error differently, such as rendering an error page or sending a response.
      throw new Error("Failed to initiate Facebook sign-in");
    }
  }



  @Get("/callback")
  public async callback(
    @Request() request: ExRequest,
    @Res()
    badRequest: TsoaResponse<400, { error: string; error_description: string }>,
    @Res() redirect: TsoaResponse<302, void>
  ): Promise<void> {
    try {
      const code = request.query.code as string;
      const error = request.query.error as string;

      if (error || !code) {
        return badRequest(400, {
          error: error || "Unknown error",
          error_description: "No authorization code found",
        });
      }

      const authorizationHeader = `Basic ${Buffer.from(
        `${configs.cognitoAppCientId}:${configs.cognitoAppCientSecret}`
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
        }
      );

      const data = response.data;

      if (!data.access_token || !data.id_token) {
        return badRequest(400, {
          error: "No tokens received",
          error_description: "Failed to retrieve tokens",
        });
      }
      // Set cookies for tokens
      request.res?.cookie("accessToken", data.access_token);
      request.res?.cookie("idToken", data.id_token);
      request.res?.cookie("refreshToken", data.refresh_token);
      // Verify and decode the ID token

      const verifier = CognitoJwtVerifier.create({
        userPoolId: configs.userPoolId,
        tokenUse: "id",
        clientId: configs.cognitoAppCientId,
      });

      const payload = await verifier.verify(data.id_token);
      const username = payload.sub; // Extract the username

      if (!username) {
        return badRequest(400, {
          error: "Invalid Token",
          error_description: "Username not found in token",
        });
      }

      // Check if the user exists and set default role if needed
      const getUserCommand = new AdminGetUserCommand({
        UserPoolId: configs.userPoolId,
        Username: username,
      });

      const userAttributes = await cognitoClient.send(getUserCommand);

      const roleAttribute = userAttributes.UserAttributes?.find(
        (attr) => attr.Name === "custom:roles"
      );

      if (!roleAttribute) {
        const updateCommand = new AdminUpdateUserAttributesCommand({
          UserPoolId: configs.userPoolId,
          Username: username,
          UserAttributes: [
            {
              Name: "custom:roles",
              Value: "user",
            },
          ],
        });

        await cognitoClient.send(updateCommand);

        // Retrieve user attributes to determine role
        const getUserCommand = new AdminGetUserCommand({
          UserPoolId: configs.userPoolId,
          Username: username,
        });

        const userAttributes = await cognitoClient.send(getUserCommand);
        const roleAttribute = userAttributes.UserAttributes?.find(
          (attr) => attr.Name === "custom:roles"
        );

        const role = roleAttribute ? roleAttribute.Value : "user";
        console.log(`User role determined: ${role}`);

        // Determine the group based on the role
        const groupName = role === "admin" ? "admin" : "user";
        console.log(`Adding user ${username} to group: ${groupName}`);
        // Add user to the appropriate group
        const addToGroupCommand = new AdminAddUserToGroupCommand({
          UserPoolId: configs.userPoolId,
          Username: username,
          GroupName: groupName,
        });

        await cognitoClient.send(addToGroupCommand);
        console.log(`User ${username} added to group ${groupName}`);
      }

      return redirect(302, undefined, { Location: configs.redirectToFrontend });
    } catch (error: any) {
      console.error("Callback error:", error);
      return badRequest(400, {
        error: "server_error",
        error_description: "An error occurred on the server",
      });
    }
  }



}
