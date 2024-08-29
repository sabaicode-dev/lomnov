import { Request as ExRequest } from "express";
import { AuthRepository } from "@/src/database/repositories/auth.repository";
import {
  RequestConfirmPasswordResetDTO,
  ResponseConfirmPasswordResetDTO,
  RequestInitiatePasswordResetDTO,
  ResponseInitiatePasswordReset,
  RequestSignInDTO,
  ResponseSignInUserDTO,
  RequestSignUpDTO,
  ResponseSignUpUserDTO,
  RequestVerifyDTO,
  ResponseVerifyUserDTO,
} from "@/src/utils/types/indext";
export class AuthService {
  private authRepository: AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async authSignUp(
    requestBody: RequestSignUpDTO,
  ): Promise<ResponseSignUpUserDTO> {
    try {
      return await this.authRepository.signUp(requestBody);
    } catch (error) {
      throw error;
    }
  }

  public async authVerify(
    requestBody: RequestVerifyDTO,
  ): Promise<ResponseVerifyUserDTO> {
    try {
      return await this.authRepository.verify(requestBody);
    } catch (error) {
      throw error;
    }
  }

  public async authSignin(
    requestBody: RequestSignInDTO,
    request: ExRequest,
  ): Promise<ResponseSignInUserDTO> {
    try {
      return await this.authRepository.signIn(requestBody, request);
    } catch (error) {
      throw error;
    }
  }

  public async authPasswordReset(
    requestBody: RequestInitiatePasswordResetDTO,
  ): Promise<ResponseInitiatePasswordReset> {
    try {
      return await this.authRepository.passwordReset(requestBody);
    } catch (error) {
      throw error;
    }
  }

  public async authConfirmPassword(
    requestBody: RequestConfirmPasswordResetDTO,
  ): Promise<ResponseConfirmPasswordResetDTO> {
    try {
      return await this.authRepository.confirmPassword(requestBody);
    } catch (error) {
      throw error;
    }
  }
}
