export interface SignUpBody {
  username: string;
  password: string;
  name: string;
  roles: string;
}

export interface VerifyBody {
  username: string;
  code: string;
}

export interface SignInBody {
  username: string;
  password: string;
}

export interface InitiatePasswordResetRequest {
  username: string;
}

export interface ConfirmPasswordResetRequest {
  username: string;
  newPassword: string;
  confirmationCode: string;
}
