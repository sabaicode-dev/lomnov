// types/api/responses.ts

export interface SignUpUserResponse {
  message: string;
  userSub: string;
}

export interface VerifyUserResponse {
  message: string;
}
export interface AuthenticationResult {
  AccessToken?: string;
  ExpiresIn?: number;
  IdToken?: string;
  RefreshToken?: string;
  TokenType?: string
}
export interface SignInUserResponse {
  message: string;
  authResult?: AuthenticationResult  ;
}

export interface InitiatePasswordResetResponse {
  message: string;
}

export interface ConfirmPasswordResetResponse {
  message: string;
}
