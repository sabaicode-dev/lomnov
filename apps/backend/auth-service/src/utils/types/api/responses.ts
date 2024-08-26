// types/api/responses.ts

export interface SignUpUserResponse {
  message: string;
  userSub: string;
}

export interface VerifyUserResponse {
  message: string;
}
interface AuthenticationResult {
  AccessToken: string;
  RefreshToken: string;
  IdToken: string;
}
export interface SignInUserResponse {
  authResult?: AuthenticationResult;
  message: string;
}

export interface InitiatePasswordResetResponse {
  message: string;
}

export interface ConfirmPasswordResetResponse {
  message: string;
}
