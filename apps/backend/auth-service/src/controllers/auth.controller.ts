import { Controller, Route, Post, Body, Tags, Request } from "tsoa";
import { Request as ExRequest } from "express";
import { CognitoService } from "@/src/services/cognito.service";
import {
  SignUpBody,
  SignInBody,
  InitiatePasswordResetRequest,
  ConfirmPasswordResetRequest,
  VerifyBody,
} from "@/src/utils/types/indext";

@Tags("Handle By hand")
@Route("api/v1")
export class ProductController extends Controller {
  private cognitoService: CognitoService;

  constructor() {
    super();
    this.cognitoService = new CognitoService();
  }
  @Post("/auth/signup")
  public async signup(@Body() body: SignUpBody): Promise<any> {
    const { username, password, name, roles } = body;
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
      const response = await this.cognitoService.signUpUser(
        username,
        password,
        attributes,
      );
      return response;
    } catch (error: any) {
      this.setStatus(400);
      return { error: error.message };
    }
  }

  @Post("/auth/verify")
  public async verify(@Body() body: VerifyBody): Promise<any> {
    const { username, code } = body;
    try {
      const response = await this.cognitoService.verifyUser(username, code);
      return response;
    } catch (error: any) {
      this.setStatus(400);
      return { error: error.message };
    }
  }

  @Post("/auth/signin")
  public async signIn(
    @Body() body: SignInBody,
    @Request() request: ExRequest,
  ): Promise<any> {
    const { username, password } = body;
    try {
      const response = await this.cognitoService.signInUser(username, password);
      request.res?.cookie("accessToken", response.authResult?.AccessToken);
      request.res?.cookie("refreshToken", response.authResult?.RefreshToken);
      request.res?.cookie("idToken", response.authResult?.IdToken);
      return { message: "Login successful" };
    } catch (error: any) {
      this.setStatus(401);
      return { error: error.message };
    }
  }

  @Post("/auth/password-reset")
  public async initiatePasswordReset(
    @Body() body: InitiatePasswordResetRequest,
  ) {
    const { username } = body;
    try {
      return await this.cognitoService.initiatePasswordReset(username);
    } catch (error: any) {
      this.setStatus(400);
      return { error: error.message };
    }
  }

  @Post("/auth/confirm-password")
  public async confirmPasswordReset(@Body() body: ConfirmPasswordResetRequest) {
    const { username, newPassword, confirmationCode } = body;
    try {
      return await this.cognitoService.confirmPasswordReset(
        username,
        newPassword,
        confirmationCode,
      );
    } catch (error: any) {
      this.setStatus(400);
      return { error: error.message };
    }
  }
}
