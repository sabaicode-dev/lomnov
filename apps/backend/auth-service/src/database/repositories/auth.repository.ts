// =========================================================================

import { CognitoService } from "@/src/services/cognito.service";
import {
  ConfirmPasswordResetRequest,
  InitiatePasswordResetRequest,
  SignInBody,
  SignUpBody,
  VerifyBody,
} from "@/src/utils/types/indext";
import { Request as ExRequest } from "express";
import { AuthModel } from "../models/auth.model";

export class AuthRepository {
  private cognitoService: CognitoService;

  constructor() {
    this.cognitoService = new CognitoService();
  }
  public async signUp(body: SignUpBody): Promise<any> {
    const { username,  name, roles } = body;
    const isPhoneNumber = username.startsWith("+");

    const attributes: {
      name: string;
      phoneNumber?: string;
      email?: string;
      "custom:roles"?: string;
    } = {
      name,
      "custom:roles": roles,
    };

    if (isPhoneNumber) {
      attributes.phoneNumber = username;
    } else {
      attributes.email = username;
    }

    try {
      // const response = await this.cognitoService.signUpUser(
      //   username,
      //   password,
      //   attributes,
      // );
      const auth = new AuthModel({
        cognitoSub: "",
        email: attributes.email,
        googleId:"",
        role: attributes["custom:roles"],
      });
      (await auth).save()

      // return response;
    } catch (error) {
      throw error;
    }
  }

  public async verify(body: VerifyBody): Promise<any> {
    const { username, code } = body;

    try {
      const response = await this.cognitoService.verifyUser(username, code);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async signIn(body: SignInBody, request: ExRequest): Promise<any> {
    const { username, password } = body;
    try {
      const response = await this.cognitoService.signInUser(username, password);
      request.res?.cookie("accessToken", response.authResult?.AccessToken);
      request.res?.cookie("refreshToken", response.authResult?.RefreshToken);
      request.res?.cookie("idToken", response.authResult?.IdToken);
      return { message: "Login successful" };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  public async passwordReset(body: InitiatePasswordResetRequest): Promise<any> {
    const { username } = body;
    try {
      return await this.cognitoService.initiatePasswordReset(username);
    } catch (error) {
      throw error;
    }
  }

  public async confirmPassword(
    body: ConfirmPasswordResetRequest,
  ): Promise<any> {
    const { username, newPassword, confirmationCode } = body;
    try {
      return await this.cognitoService.confirmPasswordReset(
        username,
        newPassword,
        confirmationCode,
      );
    } catch (error) {
      throw error;
    }
  }
}
