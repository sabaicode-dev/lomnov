export interface AgentRequestType {
  cognitoSub: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  phoneNumber?: string;
  location?: string;
  address?: string;
  age?: number | null;
  gender?: string;
  dateOfBirth?: string;
  profile?: string[];
  background?: string[];
  favorite?: Array<{
    propertyId: string;
    addedAt?: Date;
  }>;
  role?: "user" | "admin";
}