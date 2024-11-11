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
  RequestInitiatePasswordResetDTO,
  ResponseInitiatePasswordReset,
  ResponseConfirmPasswordResetDTO,
  ResponseChangeNewPasswordDTO,
  RequestchangePasswordDTO,
  APIResponse,
  IRefreshTokenRequestDTO,
  IRefreshTokenResponseDTO,
} from "@/src/utils/types/indext";
import { CognitoService } from "../services/cognito.service";
import sendResponse from "@/src/utils/sendResponse";
import setCookie from "../middlewares/cookies";
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
  ): Promise<APIResponse> {
    try {
      await this.authService.authSignUp(requestBody);

      return sendResponse({ message: `Sign up successful. Please check your phone or email for verification.` })
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/verify")
  public async verify(
    @Body() requestBody: RequestVerifyDTO,
  ): Promise<APIResponse> {
    try {
      await this.authService.authVerify(requestBody);

      return sendResponse({ message: "You've verified successfully. Please login to continue." })
    } catch (error) {
      throw error;
    }
  }

  @Post("/auth/signin")
  public async signIn(
    @Body() requestBody: RequestSignInDTO,
    @Request() request: ExRequest,
  ): Promise<APIResponse> {
    try {
      await this.authService.authSignin(requestBody, request);

      return sendResponse({ message: "You've successfully login." })
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

  @Post("/auth/reset-password")
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

  @Post("/auth/refresh-token")
  public async refreshToken(@Request() request: ExRequest, @Body() body: IRefreshTokenRequestDTO): Promise<IRefreshTokenResponseDTO> {
    try {
      const refreshToken = request.cookies['refreshToken'];
      const username = request.cookies['username'];
      if (refreshToken && username) {
        const result = await this.cognitoService.refreshTokens({
          refreshToken: body.refreshToken || refreshToken,
          username: body.username || username
        });
        setCookie(request.res!, 'idToken', result.idToken, { httpOnly: true, secure: true, sameSite: 'lax' });
        setCookie(request.res!, 'accessToken', result.accessToken, { httpOnly: true, secure: true, sameSite: 'lax' });
        return sendResponse({ message: "Token refresh succussfully",data: result })

      }else{
        return sendResponse({ message: "Missing refresh token or username" ,data:{
          statusCode: 400
        }})
      }
    } catch (error) {
      //@ts-ignore
      throw new Error("Token refresh failed: " + error.message);
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
