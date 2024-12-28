import mongoose from "mongoose";

export interface createdMessage {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  conversationId: mongoose.Types.ObjectId;
  // conversationId: mongoose.Types.ObjectId;
}
export interface messType {
  _id: string;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  conversationId: mongoose.Types.ObjectId;
}
export interface conversation {
  _id: string;
  roomId: string;
  createdAt: Date;
  messages: {
    _id: string;
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    conversationId: mongoose.Types.ObjectId;
  }[];
  participants: {
    participantType: "user" | "admin";
    participantId: string;
  }[];
  //mongoose.Types.ObjectId[];//
  updatedAt: Date;
}
export interface conversationRespond {
  conversation: conversation | [];
  currentPage: number;
  totalMessages: number;
  totalPage: number;
  limit: number;
  skip: number;
}
export interface query {
  page?: number;
  limit?: number;
}
export interface GetConversation {
  _id: string;
  roomId: string;
  createdAt: Date;
  messages: string[];
  participants: {
    participantType: "user" | "admin";
    participantId: string;
  }[];
  //mongoose.Types.ObjectId[];//
  updatedAt: Date;
}
export interface AllConversations {
  _id: string;
  receiver: string;
  messages: string[];
  updatedAt: Date;
  role: "user" | "admin";
}
[];
export interface RespondGetConversationsPagination {
  conversations: AllConversations;
  totalConversation: number;
  currentPage: number;
  totalPage: number;
  limit: number;
  skip: number;
}
export interface RespondGetConversations {
  _id: string;
  receiver: string;
  messages: string[];
  updatedAt: Date;
  role: "user" | "admin";
}[];
export type RequestgetUserConversations = {
  cognitoSub?: string,
  senderRole?: string,
  page?: number,
  limit?: number,
  skip?: number
}
export type Conversation = {
  _id: string;
  roomId: string;
  createdAt: string;
  messages: string[];
  participants: {
      participantType: string;
      participantId: string;
  }[];
  updatedAt: string;
};