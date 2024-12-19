export interface AgentResponseType {
  _id: string;
  cognitoSub: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  location: string;
  address: string;
  age: number | null;
  gender: string;
  dateOfBirth: string;
  profile: string[];
  background: string[];
  role: string;
  favorite: Array<{
    propertyId: string;
    addedAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
