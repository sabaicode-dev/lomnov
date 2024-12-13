export interface User {
    _id: string;
    cognitoSub: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    age: number | null;
    background: string[];
    createdAt: string;
    dateOfBirth: string;
    favorite: string[];
    gender: string;
    location: string;
    phoneNumber: string;
    profile: string[];
    role: string;
    updatedAt: string;
    userName: string;
}
export interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    isErrors: string;
    user: User | null;
    login: ({ email, phone_number, password }: LoginRequest) => Promise<void>;
    logout: () => Promise<void>,
    signup: ({ username, email, phone_number, password }: SignupRequest) => Promise<void>;
    verify: ({ email, phone_number, code }: VerifyUserRequest) => Promise<void>;
    siginWithGoogle: () => Promise<void>;
}
export interface IRefreshTokenRequestDTO {
    refreshToken: string;
    username: string;
}
export interface IRefreshTokenResponseDTO {
    AccessToken: string;
    ExpiresIn: number;
    IdToken: string;
    TokenType: string;
}
export interface User {
    _id: string;
    cognitoSub: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    age: number | null;
    background: string[];
    createdAt: string;
    dateOfBirth: string;
    favorite: string[];
    gender: string;
    location: string;
    phoneNumber: string;
    profile: string[];
    role: string;
    updatedAt: string;
    userName: string;
}

export interface LoginRequest {
    email?: string,
    phone_number?: string,
    password: string
}

export interface SignupRequest {
    username: string,
    email?: string,
    phone_number?: string
    password: string
}

export interface VerifyUserRequest {
    email?: string,
    phone_number?: string
    code: string
}