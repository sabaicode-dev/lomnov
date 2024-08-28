
import { Types } from 'mongoose';
export interface ResponseUserDTO {
  _id?: Types.ObjectId;
  cognitoSub: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber?: string;
  address?: string;
  age?: number;
  gender?: string;
  dateOfBirth?: string;
  profile?: string[];
  background?: string[];
  favorite?: string[];
  role?: string
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

export interface ResponseFindUserDTO{
  users: ResponseUserDTO[];
  totalUsers: number;
}
