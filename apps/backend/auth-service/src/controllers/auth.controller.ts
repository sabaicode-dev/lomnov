import { Controller, Route, Post, Body, Tags, Request, Delete, Path } from "tsoa";
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
} from "@/src/utils/types/indext";
import { CognitoService } from "../services/cognito.service";
// =========================================================================

@Tags("Manual Registration")
@Route("api/v1")
export class ProductController extends Controller {
  private authService: AuthService;
  private cognitoService: CognitoService
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

  @Delete("/auth/{cognitoSub}")
  public async deleteUser (@Path() cognitoSub: string) {
    try{
      return await this.cognitoService.deleteUser(cognitoSub)
    }catch(error){

    }
  }
}
