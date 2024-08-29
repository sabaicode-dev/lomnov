// types/api/responses.ts

export interface ResponseSignUpUserDTO {
  message: string;
  userSub?: string;
}

export interface ResponseVerifyUserDTO {
  message: string;
}
export interface AuthenticationResult {
  AccessToken?: string;
  ExpiresIn?: number;
  IdToken?: string;
  RefreshToken?: string;
  TokenType?: string
}
export interface ResponseSignInUserDTO {
  message: string;
  authResult?: AuthenticationResult  ;
  username: string | undefined
}

export interface ResponseInitiatePasswordReset {
  message: string;
}

export interface ResponseConfirmPasswordResetDTO {
  message: string;
}
