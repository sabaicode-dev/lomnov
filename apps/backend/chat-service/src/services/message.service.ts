import express from "express";
import { MessageRepository } from "../database/repositories/message.repository";
import {
  GetMessageRespond,
  SendMessageResponse,
  query,
  QueryGetUserConversations,
  RespondGetConversations,
  MessageRequest,
} from "./types/messages.service.types";

// type ParticipantsType = [
//   { participantType: "User" | "Company"; participantId: string },
// []];

export class MessageService {
  MessageRepository = new MessageRepository();
  public async sendMessaage(request: MessageRequest): Promise<SendMessageResponse> {
    try {
      const { message, receiverId, currentUser,cookieHeader } = request;
      const cookies = deCookies(cookieHeader);
      const senderId = cookies.username;
      const senderRole = currentUser.roles![0] === "user" ? "user" : "admin";
      const receiverRole = currentUser.roles![0] === "user" ? "admin" : "user";

      const participants = [
        {
          participantType: senderRole,
          participantId: senderId,
        },
        { participantType: receiverRole, participantId: receiverId },
      ];

      const roomId = [senderId, receiverId].sort().join("_");

      const result = await this.MessageRepository.sendMessage({
        senderId,
        receiverId,
        message,
        participants,
        roomId,
      });
      return { message: "Message has been Created", data: result };
    } catch (error) {
      console.error("error:::", error);
      throw error;
    }
  }
  async getMessage(
    userToChatId: string,
    cookieHeader: string,
    query: query,
    currentUser: {
      username?: string;
      role?: string[];
    }
  ): Promise<GetMessageRespond | undefined> {
    try {
      const cookies = deCookies(cookieHeader);
      const senderId = cookies.user_id;
      const senderRole =
        currentUser.role![0] === "company" ? "Company" : "User";
      const receiverRole = senderRole === "User" ? "Company" : "User";

      const result = await this.MessageRepository.getMessage(
        userToChatId,
        senderId,
        query,
        senderRole,
        receiverRole
      );

      return result as unknown as GetMessageRespond;
    } catch (error) {
      console.error("error:::", error);
      throw error;
    }
  }
  //todo::Type of return (no need for now)
  async getConversationById(conversationId: string): Promise<any> {
    try {
      const result =
        await this.MessageRepository.getConversationById(conversationId);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getUserConversations(
    cookieHeader: string,
    currentUser: { username?: string; role?: string[] },
    query: QueryGetUserConversations
  ): Promise<RespondGetConversations> {
    const { page = 1, limit = 8 } = query;
    const skip = (page - 1) * limit;
    try {
      const cookies = deCookies(cookieHeader);
      const senderId = cookies.user_id;
      console.log("user", senderId);

      const senderRole =
        currentUser.role![0] === "company" ? "Company" : "User";
      const result = await this.MessageRepository.getUserConversations(
        senderId,
        senderRole,
        page,
        limit,
        skip
      );
      return result as unknown as RespondGetConversations;
    } catch (error) {
      throw error;
    }
  }
}
const deCookies = (cookies: express.Request["headers"]["cookie"]) => {
  const decodedCookie = cookies
    ? Object.fromEntries(
        cookies.split("; ").map((c) => {
          const [key, value] = c.split("=");
          return [key, decodeURIComponent(value)];
        })
      )
    : {};
  return decodedCookie;
};
