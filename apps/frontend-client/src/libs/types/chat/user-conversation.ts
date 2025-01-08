export interface User {
  _id: string;
    cognitoSub: string;
    userName: string;
    message: Message[]; // last message 
    profile: string[];
    email: string;
    role: string;
    address: string,
    phoneNumber: string,
    lastmessage: string
}

export interface propertyDetails{
 
    image: string;
    type: string;
    bedroom: string;
    bathroom: string;
    spacious: string;
    parking: string;
  
}

export interface UserConversition {
  users: {
    _id: string;
    cognitoSub: string;
    userName: string;
    message: Message[]; // last message 
    profile: string[];
    email: string;
    role: string;
    address: string,
    phoneNumber: string,
    lastmessage: string
  }[],
}

export interface UserConversation {
  conversationUser: UserConversition,
  currentPage: number;
  totalPages: number;
  totalConversation: number;
}
export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}
export interface MessageConversation{
  _id: string;
  roomId: string;
  createdAt: string;
  messages:Message[];
}
export interface Messages{
  conversation:MessageConversation;
  currentPage: number;
  totalMessages: number;
  totalPages: number;
  limit: number;
  skip: number;
}

