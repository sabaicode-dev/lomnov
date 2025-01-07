import mongoose from "mongoose";
import ConversationModel from "../models/conversation.model";
import MessageModel from "../models/message.model";
import {
  conversation,
  conversationRespond,
  createdMessage,
  query,
  messType,
  RespondGetConversationsPagination,
  //GetConversation, RespondGetConversations,
  RequestgetUserConversations,
} from "./types/messages.repository.types";
import axios from "axios";
// import configs from "@/src/config";
// import axios from "axios";
export class MessageRepository {
  public async sendMessage(makeMessage: {
    senderId: string;
    receiverId: string;
    message: string;
    participants: { participantType: string; participantId: string }[];
    roomId: string;
  }): Promise<createdMessage> {
    try {
      const { senderId, receiverId, message, participants, roomId } =
        makeMessage;
      //find or create
      let conversation = await ConversationModel.findOneAndUpdate(
        { roomId },
        { $setOnInsert: { participants, roomId } },
        { new: true, upsert: true }
      );

      const newMessage = new MessageModel({
        senderId,
        receiverId,
        message,
        conversationId: conversation._id,
      });

      if (newMessage) {
        conversation.messages.push(
          newMessage._id as unknown as mongoose.Schema.Types.ObjectId
        );
      }
      //todo: socket

      //save to DB
      await Promise.all([conversation.save(), newMessage.save()]); //run in same time

      return newMessage as unknown as createdMessage;
    } catch (error) {
      console.error("sendMessage() message.service error:::", error);
      throw error;
    }
  }
  //todo: reduce / structure type
  async getMessage(
    userToChatId: string,
    senderId: string,
    query: query,
    senderRole: "user" | "admin",
    receiverRole: "user" | "admin"
  ): Promise<null | conversationRespond> {
    const { limit = 12, page = 1 } = query;
    const skip = (page - 1) * limit;
    try {
      const conversation = await ConversationModel.findOne({
        participants: {
          $all: [
            { $elemMatch: { participantId: senderId } },
            { $elemMatch: { participantId: userToChatId } },
          ],
        },
      }).populate({
        path: "messages",
        options: {
          limit,
          skip,
          sort: { createdAt: -1 },
        },
      });
      // console.log("1::::");

      if (!conversation) {
        // const endpoint = senderRole === "user" ? `${configs.userUrl}/` : `${configs.userUrl}/`;
        // get user profiles!
        const dataUser = (
          await axios.get(
            `http://localhost:4000/api/v1/users/profile-info/${userToChatId}`
          )
        ).data; //
        if (!dataUser) {
          return {
            conversation: [],
            currentPage: page,
            totalMessages: 0,
            totalPage: 1,
            limit: limit,
            skip: skip,
          };
        }
        // console.log("3::::");
        const roomId = [senderId, userToChatId].sort().join("_");
        const participants = [
          {
            participantType: senderRole,
            participantId: senderId,
          },
          {
            participantType: receiverRole,
            participantId: userToChatId,
          },
        ].sort();

        const conversation = await ConversationModel.findOneAndUpdate(
          { roomId },
          { $setOnInsert: { participants, roomId } },
          { new: true, upsert: true }
        );

        // console.log("4::::");
        await Promise.all([conversation.save()]); //save new conversation to DB
        return {
          conversation: conversation as unknown as conversation,
          currentPage: page,
          totalMessages: 0,
          totalPage: 1,
          limit: limit,
          skip: skip,
        };
      }
      // console.log("5::::");

      conversation.messages = (
        conversation.messages as unknown as messType[]
      ).sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ) as unknown as typeof conversation.messages;

      // console.log("6::::");
      // Step 2: Count total messages for the conversation separately
      const totalMessages = await MessageModel.countDocuments({
        conversationId: conversation._id,
      });

      // console.log("7::::");
      const totalPage = Math.ceil(totalMessages / limit);

      return {
        conversation: conversation as unknown as conversation,
        currentPage: page,
        totalMessages,
        totalPage,
        limit,
        skip,
      };
    } catch (error) {
      console.error("getMessage() message.service error:::", error);
      throw error;
    }
  }
  /*  async getConversationById(conversationId: string): Promise<conversation> {
      try {
        const conversation = await ConversationModel.findById(conversationId);
  
        return conversation as unknown as conversation;
      } catch (error) {
        throw error;
      }
    }*/
  public async findConversation(request: RequestgetUserConversations) {
    const conversation = await ConversationModel.find({
      participants: {
        $all: [
          {
            $elemMatch: {
              participantType: request.senderRole!,
              participantId: request.cognitoSub!,
            },
          },
        ],
      },
    })
      .sort({ updatedAt: -1 })
      .limit(request.limit!)
      .skip(request.skip!);
    return conversation;
  }
  public async countConversation(request: RequestgetUserConversations) {
    const count = await ConversationModel.countDocuments({
      participants: {
        $all: [
          {
            $elemMatch: {
              participantType: request.senderRole!,
              participantId: request.cognitoSub!,
            },
          },
        ],
      },
    });
    return count;
  }
  public async getUserConversations(
    request: RequestgetUserConversations
  ): Promise<RespondGetConversationsPagination | any> {
    try {
      //find conversation
      const { page = 1, limit = 10 } = request;
      const skip = (page - 1) * limit;
      const conversation = await this.findConversation({
        ...request,
        skip,
        limit,
      });
      console.log("")
      // Count total conversations
      const totalConversation = await this.countConversation(request);
      const totalPages = Math.ceil(totalConversation / limit);
      return {
        conversations: conversation,
        totalConversation: totalConversation,
        currentPage: page,
        totalPage: totalPages,
      };
    } catch (error) {
      throw error;
    }
  }
}
