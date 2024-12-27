import express from "express";
import { MessageRepository } from "../database/repositories/message.repository";
import { UserServiceClient } from "./user-service.client";
import {
  GetMessageRespond,
  SendMessageResponse,
  // QueryGetUserConversations,
  RespondGetConversations,
  MessageRequest,
  query,
  QueryGetUserConversations,
} from "./types/messages.service.types";
import { RequestgetUserConversations } from "../database/repositories/types/messages.repository.types";

export class MessageService {
  MessageRepository = new MessageRepository();
  userServiceClient = new UserServiceClient();
  public async sendMessaage(request: MessageRequest): Promise<SendMessageResponse> {
    try {
      const { message, receiverId, currentUser, cookieHeader } = request;
      const cookies = deCookies(cookieHeader);
      const senderId = cookies.username;

      const senderRole = currentUser.roles![0] === "user" ? "user" : "admin";
      // get reciever role
      const responseRole = await this.userServiceClient.getUserRole(receiverId); // receiverId = sub
      // console.log("userServiceClient:: ", responseRole);
      const receiverRole = responseRole!.role === "user" ? "user" : "admin";

      const participants = [
        {
          participantType: senderRole,
          participantId: senderId,
        },
        { participantType: receiverRole, participantId: receiverId },
      ];

      const roomId = [senderId, receiverId].sort().join("_");//

      const result = await this.MessageRepository.sendMessage({ senderId, receiverId, message, participants, roomId });
      return { message: "Message has been Created", data: result };
    } catch (error) {
      console.error("error:::", error);
      throw error;
    }
  }
  async getMessage(userToChatId: string, cookieHeader: string, query: query, currentUser: { username?: string; roles?: string }): Promise<GetMessageRespond | undefined> {
    try {
      const cookies = deCookies(cookieHeader);
      const senderName = cookies.username;
      const senderRole = currentUser.roles! === "user" ? "user" : "admin";
      // get receiverole
      const getReiverRole = await this.userServiceClient.getUserRole(userToChatId)
      const result = await this.MessageRepository.getMessage(userToChatId, senderName, query, senderRole, getReiverRole?.role as "user" | "admin");
      return result as unknown as GetMessageRespond;
    } catch (error) {
      console.error("error:::", error);
      throw error;
    }
  }
  //todo::Type of return (no need for now)
  /* async getConversationById(conversationId: string): Promise<any> {
     try {
       const result =
         await this.MessageRepository.getConversationById(conversationId);
       return result;
     } catch (error) {
       throw error;
     }
   }*/
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
      const senderRole = currentUser.role![0] === "user" ? "user" : "admin";
      const request: RequestgetUserConversations = { senderId, senderRole, page, limit, skip }
      const result = await this.MessageRepository.getUserConversations(request!);
      return result as unknown as RespondGetConversations;
    } catch (error) {
      throw error;
    }
  }
}
const deCookies = (cookies: express.Request["headers"]["cookie"]) => {
  const decodedCookie = cookies ? Object.fromEntries(
    cookies.split("; ").map((c) => {
      const [key, value] = c.split("=");
      return [key, decodeURIComponent(value)];
    })
  )
    : {};
  return decodedCookie;
};
