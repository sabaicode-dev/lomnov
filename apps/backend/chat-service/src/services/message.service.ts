import express from "express";
import { MessageRepository } from "../database/repositories/message.repository";
import { UserServiceClient } from "./user-service.client";
import {
  GetMessageRespond,
  SendMessageResponse,
  // QueryGetUserConversations,
  MessageRequest,
  query,
  QueryGetUserConversations,
  ResponseConversationMe,
  UserConversations,
  User,
} from "./types/messages.service.types";
import { Conversation, RequestgetUserConversations } from "../database/repositories/types/messages.repository.types";

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
  async getMessage(userToChatId: string, cookieHeader: string, query: query, currentUser: { username?: string; roles?: string[] }): Promise<GetMessageRespond | undefined> {
    try {
      const cookies = deCookies(cookieHeader);
      const senderName = cookies.username;
      const senderRole = currentUser.roles && currentUser.roles[0] === "user" ? "user" : "admin";
      // get receiverole
      const getReiverRole = await this.userServiceClient.getUserRole(userToChatId)
      const result = await this.MessageRepository.getMessage(userToChatId, senderName, query, senderRole, getReiverRole?.role as "user" | "admin");
      return result as unknown as GetMessageRespond;
    } catch (error) {
      console.error("error:::", error);
      throw error;
    }
  }
  private getParticipantIds(conversations: any, cognitoSub: string): string[] {
    if (conversations) {
      return conversations.conversations
        .map((conversation: any) =>
          conversation.participants
            .filter((participant: any) => participant.participantId !== cognitoSub)
            .map((participant: any) => participant.participantId)
        )
        .flat();
    }
    return [];
  }
  private checkUserRole(role: string | string[]): string {
    const getRole = role.includes("user") ? "user" : "admin";
    return getRole;
  }

  private buildFilter(users: User[], conversations: Conversation[]): ResponseConversationMe {
    // Create a map of users based on cognitoSub for quick lookup
    const userMap = new Map(users.map((user) => [user.cognitoSub, user]));

    // Transform conversations into the desired structure
    const conversationUsers = conversations.map((conversation) => {
      return conversation.participants
        .map((participant) => {
          const user = userMap.get(participant.participantId);
          if (user) {
            return {
              _id: user._id,
              cognitoSub: user.cognitoSub,
              userName: user.userName,
              message: conversation.messages, // last message
              profile: user.profile,
              email: user.email,
              role: user.role,
            };
          } else {
            console.warn(`No user found for participantId: ${participant.participantId}`);
            return null;
          }
        })
        .filter(Boolean); // Remove null values
    }).flat();

    // Build the ResponseConversationMe object
    const response: ResponseConversationMe = {
      conversationUser: {
        users: conversationUsers as UserConversations["users"],
      },
      currentPage: 1, // Default page info as no pagination logic is implemented
      totalPage: 1,   // Default total page info
      totalConversation: conversations.length,
    };

    console.log("Response: ", response);
    return response;
  }
  // Get user conversations and map users
  async getUserConversations(cognitoSub: string, currentUser: { username?: string; roles?: string[] }, query: QueryGetUserConversations): Promise<ResponseConversationMe> {
    const { page = 1, limit = 8 } = query;
    const skip = (page - 1) * limit;
    try {
      // const senderRole = currentUser.roles?.includes("user") ? "user" : "admin";
      const senderRole = this.checkUserRole(currentUser.roles as string[]);
      // build object to get conversation from repository
      const request: RequestgetUserConversations = { cognitoSub, senderRole, page, limit, skip };

      const conversations = await this.MessageRepository.getUserConversations(request!);
      // get pagination of conversations
      const { totalConversation, currentPage, totalPage } = conversations
      if (!conversations || !conversations.conversations) {
        return {
          conversationUser: { users: [] },
          totalConversation: 0,
          totalPage: 1,
          currentPage: 1,
        };
      }

      //const { totalConversation, currentPage, totalPage } = conversations;

      // Extract participant IDs
      const participantIds: string[] = this.getParticipantIds(conversations, cognitoSub);
      // retrieve user details
      const retrieveUser = await this.userServiceClient.getUsersAndFilter(participantIds);

      const response = this.buildFilter(retrieveUser, conversations.conversations)
      const { conversationUser } = response;
      return {
        conversationUser, currentPage: currentPage, totalPage: totalPage, totalConversation: totalConversation
      };
    } catch (error) {
      console.error("Error in getUserConversations:", error);
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
