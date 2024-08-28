export interface RequestUserDTO {
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

export interface GetAllUsersQueryDTO {
  page: number;
  limit: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  role?: string;
}




