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
    participantType: "User" | "Company";
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
    participantType: "User" | "Company";
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
  role: "User" | "Company";
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
  role: "User" | "Company";
}
[];
