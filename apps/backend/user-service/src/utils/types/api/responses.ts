import { Types } from "mongoose";
import { FavoriteItem } from "../indext";
export interface ResponseUserDTO {
  _id: Types.ObjectId ;
  cognitoSub: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  phoneNumber?: string;
  location?: string;
  address?: string;
  age?: number;
  gender?: string;
  dateOfBirth?: string;
  profile?: string[];
  background?: string[];
  favorite?: FavoriteItem[];
  role?: string;
}

export interface ResponseFindUserBySubDTO {
  _id: Types.ObjectId ;
  cognitoSub: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  phoneNumber?: string;
  location?: string;
  address?: string;
  age?: number;
  gender?: string;
  dateOfBirth?: string;
  profile?: string[];
  background?: string[];
  favorite?: FavoriteItem[];
  role?: string;
}

export interface ResponseUpdateUserDTO {
  _id: Types.ObjectId ;
  cognitoSub: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  phoneNumber?: string;
  location?: string;
  address?: string;
  age?: number;
  gender?: string;
  dateOfBirth?: string;
  profile?: string[];
  background?: string[];
  favorite?:FavoriteItem[];
  role?: string;
}

interface PaginationDTO {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}

export interface ResponseAllUserDTO {
  users: ResponseUserDTO[];
  pagination: PaginationDTO;
}

export interface ResponseFindUserDTO {
  users: ResponseUserDTO[];
  totalUsers: number;
}

export interface UpdateUserDTO {
  request: Express.Request;
  profileFiles?: Express.Multer.File[];
  backgroundFiles?: Express.Multer.File[];
  firstName?: string;
  lastName?: string;
  userName?: string;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
}

// Response DTO
export interface DeleteProfileImageResponseDTO {
  message: string;
}

export interface FavoriteResponseDTO {
  message: string;
  user: ResponseUserDTO | null;
}

export interface ResponseUsernameExist {
  usernameExist: boolean;
}
