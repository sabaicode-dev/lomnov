declare module "express-session" {
  interface Session {
    state?: string;
  }
}

import { Controller, Get, Route, Request, Res, TsoaResponse } from "tsoa";
import { Request as ExRequest } from "express";
import { randomBytes } from "crypto";
import axios from "axios";
import configs from "@/src/config";

@Route("api/v1")
export class GoogleController extends Controller {
  @Get("/google/signin")
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
      Location: `${configs.cognitoAppDomain}/oauth2/authorize?${authorizeParams.toString()}`,
    });
  }

  @Get("/callback")
  public async callback(
    @Request() request: ExRequest,
    @Res()
    badRequest: TsoaResponse<400, { error: string; error_description: string }>,
    @Res() redirect: TsoaResponse<302, void>,
  ): Promise<void> {
    try {
      const code = request.query.code as string;
      const error = request.query.error as string;

      console.log(code);

      if (error || !code) {
        return badRequest(400, {
          error: error || "Unknown error",
          error_description: "No authorization code found",
        });
      }

      const authorizationHeader = `Basic ${Buffer.from(`${configs.cognitoAppCientId}:${configs.cognitoAppCientSecret}`).toString("base64")}`;
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

      const data = response.data;

      if (!data.access_token || !data.id_token) {
        return badRequest(400, {
          error: "No tokens received",
          error_description: "Failed to retrieve tokens",
        });
      }

      // Set cookies or handle tokens as needed
      request.res?.cookie("access_token", data.access_token);
      request.res?.cookie("id_token", data.id_token);
      request.res?.cookie("refresh_token", data.refresh_token);
      return redirect(302, undefined, { Location: "/" });
    } catch (error: any) {
      console.error("Callback error:", error);
      return badRequest(400, {
        error: "server_error",
        error_description: "An error occurred on the server",
      });
    }
  }
}
