export interface RequestSignUpDTO {
  username: string;
  password: string;
  name: string;
  roles: string;
}

export interface RequestVerifyDTO {
  username: string;
  code: string;
}

export interface RequestSignInDTO {
  username: string;
  password: string;
}

export interface RequestInitiatePasswordResetDTO {
  username: string;
}

export interface RequestConfirmPasswordResetDTO {
  username: string;
  newPassword: string;
  confirmationCode: string;
}

// cognito service
export interface RequestSignUpUserDTO {
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


export interface RequestInitiatePasswordResetDTO {
  username: string
}

export interface RequestConfirmPasswordResetDTO {
  username: string,
  newPassword: string,
  confirmationCode: string
}

export interface JwtPayload {
  sub: string | undefined;
  // add other properties if needed
}
