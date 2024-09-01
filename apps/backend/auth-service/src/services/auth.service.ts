import { Request as ExRequest } from "express";
import {
  RequestConfirmPasswordResetDTO,
  ResponseConfirmPasswordResetDTO,
  RequestInitiatePasswordResetDTO,
  ResponseInitiatePasswordReset,
  RequestSignInDTO,
  RequestSignUpDTO,
  ResponseSignUpUserDTO,
  RequestVerifyDTO,
  ResponseVerifyUserDTO,
  ResponseChangeNewPasswordDTO,
  RequestchangePasswordDTO,
} from "@/src/utils/types/indext";
import axios from "axios";
import configs from "../config";
import { CognitoService } from "./cognito.service";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
  ValidationError,
} from "../utils/error/customErrors";
// ===================================================================
declare global {
  namespace Express {
    interface Request {
      cookies: { [key: string]: string }; // Define the structure of cookies
    }
  }
}
export class AuthService {
  private cognitoService: CognitoService;

  constructor() {
    this.cognitoService = new CognitoService();
  }
  public async authSignUp(
    requestBody: RequestSignUpDTO,
  ): Promise<ResponseSignUpUserDTO> {
    let cognitoUserSub: string | undefined;
    try {
      const { firstName, lastName, email, username, password } = requestBody;
      const data = { email, password, username, role: "user" };
      const findUsernameExist = await axios.get(
        `${configs.userServiceDomain}/api/v1/users/username/${username}`,
      );
      if (findUsernameExist.data.usernameExist) {
        throw new ValidationError(" Username already exist");
      }
      const response = await this.cognitoService.signUpUser(data);
      cognitoUserSub = response.userSub;
      if (!response.userSub) {
        throw new BadRequestError("Please signup again");
      }
      const userPayload = {
        cognitoSub: response.userSub, // Cognito userSub
        firstName, // First name
        lastName,
        email: email, // Last name
        userName: username, // Username (not Cognito username)
      };
      await axios.post(
        `${configs.userServiceDomain}/api/v1/users`,
        userPayload,
      );
      return response;
    } catch (error: any) {
      if (cognitoUserSub) {
        try {
          // If the database insertion fails, rollback the Cognito signup
          await this.cognitoService.deleteUser(cognitoUserSub);
        } catch (error: any) {
          throw new InternalServerError(error.message);
        }
      }
      if (
        error instanceof ValidationError ||
        error instanceof BadRequestError
      ) {
        throw error;
      } else {
        throw new InternalServerError("Please signup again");
      }
    }
  }

  public async authVerify(
    requestBody: RequestVerifyDTO,
  ): Promise<ResponseVerifyUserDTO> {
    const { email, code } = requestBody;
    const data = { email, code };
    try {
      const response = await this.cognitoService.verifyUser(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async authSignin(
    requestBody: RequestSignInDTO,
    request: ExRequest,
  ): Promise<{ message: string }> {
    const { email, password } = requestBody;
    const data = { email, password };
    try {
      const response = await this.cognitoService.signInUser(data);
      request.res?.cookie("accessToken", response.authResult?.AccessToken);
      request.res?.cookie("refreshToken", response.authResult?.RefreshToken);
      request.res?.cookie("idToken", response.authResult?.IdToken);
      request.res?.cookie("username", response.username);
      return { message: response.message };
    } catch (error) {
      throw error;
    }
  }

  public async authChangePassword(
    request: Express.Request,
    requestBody: RequestchangePasswordDTO,
  ): Promise<ResponseChangeNewPasswordDTO> {
    try {
      const accessToken = request.cookies?.accessToken;
      if (!accessToken) {
        throw new UnauthorizedError();
      }
      const { previousPassword, proposedPassword } = requestBody;
      return await this.cognitoService.changeUserPassword(
        accessToken,
        previousPassword,
        proposedPassword,
      );
    } catch (error) {
      throw error;
    }
  }

  public async authPasswordReset(
    requestBody: RequestInitiatePasswordResetDTO,
  ): Promise<ResponseInitiatePasswordReset> {
    const { email } = requestBody;
    const data = { email };
    try {
      return await this.cognitoService.initiatePasswordReset(data);
    } catch (error) {
      throw error;
    }
  }

  public async authConfirmPassword(
    requestBody: RequestConfirmPasswordResetDTO,
  ): Promise<ResponseConfirmPasswordResetDTO> {
    const { email, newPassword, confirmationCode } = requestBody;
    const data = { email, newPassword, confirmationCode };
    try {
      return await this.cognitoService.confirmPasswordReset(data);
    } catch (error) {
      throw error;
    }
  }
}
