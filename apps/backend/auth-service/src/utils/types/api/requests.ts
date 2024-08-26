export interface SignUpRequest {
  username: string;
  password: string;
  name: string;
  roles: string;
}

export interface VerifyRequest {
  username: string;
  code: string;
}

export interface SignInRequest {
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

// cognito service
export interface SignUpUserRequest {
  username: string;
  password: string;
  attributes: {
    name: string;
    phoneNumber?: string;
    email?: string;
    "custom:roles"?: string;
  };
}


export interface SignInUserRequest {
  username: string;
  password: string;
}


export interface InitiatePasswordResetRequest {
  username: string
}

export interface ConfirmPasswordResetRequest {
  username: string,
  newPassword: string,
  confirmationCode: string
}
