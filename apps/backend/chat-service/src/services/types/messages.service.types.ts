import mongoose from "mongoose";

export interface conversation {
  _id: mongoose.Types.ObjectId;
  participants: {
    participantType: "User" | "Company";
    participantId: string;
  }[];
  messages: {
    _id: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
    conversationId: mongoose.Types.ObjectId;
  }[];
  createdAt: Date;
  updatedAt: Date;
  roomId: string;
}

export interface messages {
  _id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
  conversationId: mongoose.Types.ObjectId;
  // conversationId: mongoose.Types.ObjectId;
}
export interface query {
  page?: number;
  limit?: number;
}
export interface GetMessageRespond {
  conversation: conversation;
  currentPage: number;
  totalMessages: number;
  totalPage: number;
  limit: number;
  skip: number;
}

export interface AllConversations {
  _id: string;
  receiver: string;
  roomId: string
  messages: string[];
  updatedAt: Date;
}
[];
export interface RespondGetConversations {
  conversations: AllConversations[];
  totalConversation: number;
  currentPage: number;
  totalPage: number;
  limit?: number;
  skip?: number;
}
export interface QueryGetUserConversations {
  page?: number;
  limit?: number;
}
//
export interface SendMessageResponse {
  message: string;
  data: messages;
}
export interface MessageRequest {
  message: string;
  cookieHeader: string;
  receiverId: string;
  currentUser: { username?: string; roles?: string[] };
}
export type UserConversations = {
  users: {
    _id: string;
    cognitoSub: string;
    userName: string;
    message: string[]; // last message 
    profile: string[];
    email: string;
    role: string;
    address: string,
    phoneNumber: string,
  }[],
}
export type ResponseConversationMe = {
  conversationUser: UserConversations,
  currentPage: number;
  totalPage: number;
  totalConversation: number;
}


export type User = {
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
  favorite: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
