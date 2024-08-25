import { Controller, Route, Post, Body, Tags, Request } from "tsoa";
import { Request as ExRequest } from "express";
import {
  SignUpBody,
  SignInBody,
  InitiatePasswordResetRequest,
  ConfirmPasswordResetRequest,
  VerifyBody,
} from "@/src/utils/types/indext";
import { AuthService } from "../services/auth.service";
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
  public async signup(@Body() body: SignUpBody): Promise<any> {
    try {
      return await this.authService.authSignUp(body);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/verify")
  public async verify(@Body() body: VerifyBody): Promise<any> {
    try {
      return await this.authService.authVerify(body);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/signin")
  public async signIn(
    @Body() body: SignInBody,
    @Request() request: ExRequest,
  ): Promise<any> {
    try {
      return await this.authService.authSignin(body, request);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/password-reset")
  public async initiatePasswordReset(
    @Body() body: InitiatePasswordResetRequest,
  ) {
    try {
      return await this.authService.authPasswordReset(body);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/confirm-password")
  public async confirmPasswordReset(@Body() body: ConfirmPasswordResetRequest) {
    try {
      return await this.authService.authConfirmPassword(body);
    } catch (error) {
      throw error;
    }
  }


}
