import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Queries,
  Request,
  Route,
} from "tsoa";
import express from "express";
import { MessageService } from "../services/message.service";
// import {query,QueryGetUserConversations} from "./types/message.controller.types";
import { MessageRequest } from "../services/types/messages.service.types";
import {
  query,
  QueryGetUserConversations,
} from "./types/message.controller.types";
import { UserRequestChat } from "./types/user.request";

@Route("/api/v1/chat")
export class MessageController extends Controller {
  MessageService = new MessageService();
  /**
   * Send new Message to someone with username or cognito sub as a ReceiverId
   */
  @Post("/send/{receiverId}")
  public async sendMessage(
    @Path() receiverId: string,
    @Body() reqBody: { message: string },
    @Request() request: express.Request
  ) {
    try {
      const { message } = reqBody;
      // console.log("request.headers", request.headers);

      const cookieHeader = request.headers.cookie!;
    

      // sender
      const currentUser = JSON.parse(
        request.headers.currentuser! as string
      ) as {
        username?: string; //
        roles?: string[];
      };
   

      const requestData: MessageRequest = {
        message,
        cookieHeader,
        receiverId,
        currentUser,
      };
      return await this.MessageService.sendMessaage(requestData);
    } catch (error) {
      console.error("error:::", error);
      throw error;
    }
  }
  /**
   *
   */
  @Get("/get-messages/{userToChatId}")
  public async getMessages(
    @Path() userToChatId: string,
    @Request() request: express.Request,
    @Queries() query: query
  ) {
    try {
      const cookieHeader = request.headers.cookie;
      // console.log("header cookie:::", cookieHeader);

      const currentUser = JSON.parse(
        request.headers.currentuser as string
      ) as UserRequestChat;
      // Fetch the result from the service
      const result = await this.MessageService.getMessage(
        userToChatId,
        cookieHeader!,
        query,
        currentUser!
      );
      // Modify the messages array to move the specific message to the last index
      if (result?.conversation?.messages) {
        const messages = result.conversation.messages;

        // Find the most recent message (you can use any condition here)
        const mostRecentIndex = messages.findIndex(
          (msg) => msg.message === "Hello ME " // Replace with your condition
        );

        if (mostRecentIndex !== -1) {
          // Remove the most recent message and push it to the end
          const [mostRecentMessage] = messages.splice(mostRecentIndex, 1);
          messages.push(mostRecentMessage);
        }
      }

      return result; // Return the modified result
    } catch (error) {
      console.error("Error in getMessages:", error);
      throw error;
    }
  }

  @Get("/conversation/me")
  //get all conversations with user Id
  public async getUserConversations(
    @Request() request: express.Request,
    @Queries() query: QueryGetUserConversations
  ) {
    try {
      const currentUser = JSON.parse(
        request.headers.currentuser as string
      ) as UserRequestChat;
      console.log(currentUser);
      const cognitoSub = currentUser.username;
      if (!cognitoSub) {
        throw new Error("Authurize User!!");
      }
      const result = await this.MessageService.getUserConversations(
        cognitoSub!,
        currentUser!,
        query
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
