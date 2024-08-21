import { AuthRepository } from "@/src/database/repositories/auth.repository";
import { ConfirmPasswordResetRequest, InitiatePasswordResetRequest, SignInBody, SignUpBody, VerifyBody } from "../utils/types/indext";
import { Request as ExRequest } from "express";
export class AuthService {
  private authRepository: AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async authSignUp(body: SignUpBody): Promise<any> {
    try {
      return await this.authRepository.signUp(body);
    } catch (error) {
      throw error;
    }
  }

  public async authVerify(body: VerifyBody): Promise<any> {
    try {
      return await this.authRepository.verify(body);
    } catch (error) {
      throw error;
    }
  }

  public async authSignin(body: SignInBody, request: ExRequest): Promise<any> {
    try {
      return await this.authRepository.signIn(body, request);
    } catch (error) {
      throw error;
    }
  }

  public async authPasswordReset(body: InitiatePasswordResetRequest): Promise<any> {
    try {
      return await this.authRepository.passwordReset(body)
    } catch (error) {
      throw error;
    }
  }

  public async authConfirmPassword(body:ConfirmPasswordResetRequest): Promise<any> {
    try {
      return await this.authRepository.confirmPassword(body)
    } catch (error) {
      throw error;
    }
  }
}
