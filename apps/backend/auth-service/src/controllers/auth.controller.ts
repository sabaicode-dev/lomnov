import {
  Controller,
  Route,
  Post,
  Body,
  Tags,
  Request,
  Delete,
  Path,
} from "tsoa";
import { Request as ExRequest } from "express";
import { AuthService } from "@/src/services/auth.service";
import {
  RequestSignUpDTO,
  RequestSignInDTO,
  RequestConfirmPasswordResetDTO,
  RequestVerifyDTO,
  ResponseVerifyUserDTO,
  ResponseSignUpUserDTO,
  RequestInitiatePasswordResetDTO,
  ResponseInitiatePasswordReset,
  ResponseConfirmPasswordResetDTO,
  ResponseChangeNewPasswordDTO,
  RequestchangePasswordDTO,
} from "@/src/utils/types/indext";
import { CognitoService } from "../services/cognito.service";
import { InternalServerError } from "../utils/error/customErrors";
// =========================================================================

@Tags("Manual Registration")
@Route("api/v1")
export class ProductController extends Controller {
  private authService: AuthService;
  private cognitoService: CognitoService;
  constructor() {
    super();
    this.authService = new AuthService();
    this.cognitoService = new CognitoService();
  }

  @Post("/auth/signup")
  public async signup(
    @Body() requestBody: RequestSignUpDTO,
  ): Promise<ResponseSignUpUserDTO> {
    try {
      return await this.authService.authSignUp(requestBody);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/verify")
  public async verify(
    @Body() requestBody: RequestVerifyDTO,
  ): Promise<ResponseVerifyUserDTO> {
    try {
      return await this.authService.authVerify(requestBody);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/signin")
  public async signIn(
    @Body() requestBody: RequestSignInDTO,
    @Request() request: ExRequest,
  ): Promise<ResponseSignUpUserDTO> {
    try {
      return await this.authService.authSignin(requestBody, request);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/change-password")
  public async changeNewPassword(
    @Request() request: Express.Request,
    @Body() requestBody: RequestchangePasswordDTO,
  ): Promise<ResponseChangeNewPasswordDTO> {
    try {
      return await this.authService.authChangePassword(request, requestBody);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/password-reset")
  public async initiatePasswordReset(
    @Body() requestBody: RequestInitiatePasswordResetDTO,
  ): Promise<ResponseInitiatePasswordReset> {
    try {
      return await this.authService.authPasswordReset(requestBody);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/confirm-password")
  public async confirmPasswordReset(
    @Body() requestBody: RequestConfirmPasswordResetDTO,
  ): Promise<ResponseConfirmPasswordResetDTO> {
    try {
      return await this.authService.authConfirmPassword(requestBody);
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/refresh-token/{refresh}")
  public async refreshToken(
    @Path() refresh: string,
    @Request() request: ExRequest,
  ) {
    try {
      const username = request.cookies.username;
      const response = await this.cognitoService.refreshTokens(refresh, username);
      // Set cookies with a max age of 7 days for the access token
      request.res?.cookie("accessToken", response.authResult?.AccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      request.res?.cookie("idToken", response.authResult?.IdToken, {
        httpOnly: true,
        secure: true,
      });
      request.res?.cookie("username", response.username, {
        httpOnly: true,
        secure: true,
      });

      return { message: response.message };
    } catch (error: any) {

      throw new InternalServerError(`An error occurred: ${error.message}`);
    }
  }

  @Delete("/auth/{cognitoSub}")
  public async deleteUser(@Path() cognitoSub: string) {
    try {
      return await this.cognitoService.deleteUser(cognitoSub);
    } catch (error) {
      throw error;
    }
  }
}
