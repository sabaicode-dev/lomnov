import { Request as ExRequest } from "express";
import { CognitoService } from "@/src/services/cognito.service";
import {
  ConfirmPasswordResetRequest,
  ConfirmPasswordResetResponse,
  InitiatePasswordResetRequest,
  InitiatePasswordResetResponse,
  SignInRequest,
  // SignInUserResponse,
  SignUpRequest,
  SignUpUserResponse,
  VerifyRequest,
  VerifyUserResponse,
} from "@/src/utils/types/indext";
// ====================================================================

export class AuthRepository {
  private cognitoService: CognitoService;
  constructor() {
    this.cognitoService = new CognitoService();
  }
  public async signUp(requestBody: SignUpRequest): Promise<SignUpUserResponse> {
    const { username, name, password, roles } = requestBody;
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
    const data = { username, password, attributes };
    try {
      const response = await this.cognitoService.signUpUser(data);

      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public async verify(requestBody: VerifyRequest): Promise<VerifyUserResponse> {
    const { username, code } = requestBody;
    const data = { username, code };
    try {
      const response = await this.cognitoService.verifyUser(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async signIn(
    requestBody: SignInRequest,
    request: ExRequest,
  ): Promise<any> {
    const { username, password } = requestBody;
    const data = { username, password };
    try {
      const response = await this.cognitoService.signInUser(data);
      request.res?.cookie("accessToken", response.authResult?.AccessToken);
      request.res?.cookie("refreshToken", response.authResult?.RefreshToken);
      request.res?.cookie("idToken", response.authResult?.IdToken);
      console.log(response.authResult)
      return { message: "Login successful" };
    } catch (error) {
      throw error;
    }
  }

  public async passwordReset(
    requestBody: InitiatePasswordResetRequest,
  ): Promise<InitiatePasswordResetResponse> {
    const { username } = requestBody;
    const data = { username };
    try {
      return await this.cognitoService.initiatePasswordReset(data);
    } catch (error) {
      throw error;
    }
  }

  public async confirmPassword(
    requestBody: ConfirmPasswordResetRequest,
  ): Promise<ConfirmPasswordResetResponse> {
    const { username, newPassword, confirmationCode } = requestBody;
    const data = { username, newPassword, confirmationCode };
    try {
      return await this.cognitoService.confirmPasswordReset(data);
    } catch (error) {
      throw error;
    }
  }
}
