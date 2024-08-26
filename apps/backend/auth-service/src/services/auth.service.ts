import { AuthRepository } from "@/src/database/repositories/auth.repository";
import {
  ConfirmPasswordResetRequest,
  ConfirmPasswordResetResponse,
  InitiatePasswordResetRequest,
  InitiatePasswordResetResponse,
  SignInRequest,
  SignInUserResponse,
  SignUpRequest,
  SignUpUserResponse,
  VerifyRequest,
  VerifyUserResponse,
} from "../utils/types/indext";
import { Request as ExRequest } from "express";
export class AuthService {
  private authRepository: AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async authSignUp(
    requestBody: SignUpRequest,
  ): Promise<SignUpUserResponse> {
    try {
      return await this.authRepository.signUp(requestBody);
    } catch (error) {
      throw error;
    }
  }

  public async authVerify(
    requestBody: VerifyRequest,
  ): Promise<VerifyUserResponse> {
    try {
      return await this.authRepository.verify(requestBody);
    } catch (error) {
      throw error;
    }
  }

  public async authSignin(
    requestBody: SignInRequest,
    request: ExRequest,
  ): Promise<SignInUserResponse> {
    try {
      return await this.authRepository.signIn(requestBody, request);
    } catch (error) {
      throw error;
    }
  }

  public async authPasswordReset(
    requestBody: InitiatePasswordResetRequest,
  ): Promise<InitiatePasswordResetResponse> {
    try {
      return await this.authRepository.passwordReset(requestBody);
    } catch (error) {
      throw error;
    }
  }

  public async authConfirmPassword(
    requestBody: ConfirmPasswordResetRequest,
  ): Promise<ConfirmPasswordResetResponse> {
    try {
      return await this.authRepository.confirmPassword(requestBody);
    } catch (error) {
      throw error;
    }
  }
}
