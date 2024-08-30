import { Request as ExRequest } from "express";
import { CognitoService } from "@/src/services/cognito.service";
import {
  RequestConfirmPasswordResetDTO,
  ResponseConfirmPasswordResetDTO,
  RequestInitiatePasswordResetDTO,
  ResponseInitiatePasswordReset,
  RequestSignInDTO,
  // SignInUserResponse,
  RequestSignUpDTO,
  ResponseSignUpUserDTO,
  RequestVerifyDTO,
  ResponseVerifyUserDTO,
} from "@/src/utils/types/indext";
import axios from "axios";
// ====================================================================

export class AuthRepository {
  private cognitoService: CognitoService;
  constructor() {
    this.cognitoService = new CognitoService();
  }
  public async signUp(requestBody: RequestSignUpDTO): Promise<ResponseSignUpUserDTO> {
    try {
      const { firstName, lastName, username, name, password, roles } = requestBody;
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
      const response = await this.cognitoService.signUpUser(data);
      console.log(response.userSub)
      const userPayload = {
        cognitoSub: response.userSub, // Cognito userSub
        firstName,  // First name
        lastName,   // Last name
        userName: name // Username (not Cognito username)
      };
      await axios.post('http://localhost:4002/api/v1/users', userPayload);
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public async verify(requestBody: RequestVerifyDTO): Promise<ResponseVerifyUserDTO> {
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
    requestBody: RequestSignInDTO,
    request: ExRequest,
  ): Promise<any> {
    const { username, password } = requestBody;
    const data = { username, password };
    try {
      const response = await this.cognitoService.signInUser(data);
      request.res?.cookie("accessToken", response.authResult?.AccessToken);
      request.res?.cookie("refreshToken", response.authResult?.RefreshToken);
      request.res?.cookie("idToken", response.authResult?.IdToken);
      request.res?.cookie("username", response.username)

      console.log(response.authResult)
      return { message: "Login successful" };
    } catch (error) {
      throw error;
    }
  }

  public async passwordReset(
    requestBody: RequestInitiatePasswordResetDTO,
  ): Promise<ResponseInitiatePasswordReset> {
    const { username } = requestBody;
    const data = { username };
    try {
      return await this.cognitoService.initiatePasswordReset(data);
    } catch (error) {
      throw error;
    }
  }

  public async confirmPassword(
    requestBody: RequestConfirmPasswordResetDTO,
  ): Promise<ResponseConfirmPasswordResetDTO> {
    const { username, newPassword, confirmationCode } = requestBody;
    const data = { username, newPassword, confirmationCode };
    try {
      return await this.cognitoService.confirmPasswordReset(data);
    } catch (error) {
      throw error;
    }
  }
}
