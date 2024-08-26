import { Controller, Route, Post, Body, Tags, Request } from "tsoa";
import { Request as ExRequest } from "express";
import { AuthService } from "@/src/services/auth.service";
import {
  SignUpRequest,
  SignInRequest,
  InitiatePasswordResetRequest,
  ConfirmPasswordResetRequest,
  VerifyRequest,
  VerifyUserResponse,
  SignUpUserResponse,
  SignInUserResponse,
  InitiatePasswordResetResponse,
  ConfirmPasswordResetResponse,
} from "@/src/utils/types/indext";
// =========================================================================

@Tags("Handle By hand")
@Route("api/v1")
export class ProductController extends Controller {
  private authService: AuthService;
  constructor() {
    super();
    this.authService = new AuthService();
  }

  @Post("/auth/signup")
  public async signup(
    @Body() requestBody: SignUpRequest,
  ): Promise<SignUpUserResponse> {
    try {
      return await this.authService.authSignUp(requestBody);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/verify")
  public async verify(
    @Body() requestBody: VerifyRequest,
  ): Promise<VerifyUserResponse> {
    try {
      return await this.authService.authVerify(requestBody);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/signin")
  public async signIn(
    @Body() requestBody: SignInRequest,
    @Request() request: ExRequest,
  ): Promise<SignInUserResponse> {
    try {
      return await this.authService.authSignin(requestBody, request);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/password-reset")
  public async initiatePasswordReset(
    @Body() requestBody: InitiatePasswordResetRequest,
  ): Promise<InitiatePasswordResetResponse> {
    try {
      return await this.authService.authPasswordReset(requestBody);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/confirm-password")
  public async confirmPasswordReset(
    @Body() requestBody: ConfirmPasswordResetRequest,
  ): Promise<ConfirmPasswordResetResponse> {
    try {
      return await this.authService.authConfirmPassword(requestBody);
    } catch (error) {
      throw error;
    }
  }
}
