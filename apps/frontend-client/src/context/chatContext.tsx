"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/libs/axios"; // Assuming axiosInstance is configured properly
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
// Define the context type
interface ChatContextType {
  conversations: any[]; // List of all conversations
  messages: { [key: string]: any[] }; // Messages keyed by user ID
  fetchConversations: () => Promise<void>;
  fetchMessages: (userToChatId: string) => Promise<void>;
  sendMessage: (receiverId: string, message: string) => Promise<void>;
}

// Create the context
const ChatContext = createContext<ChatContextType | null>(null);

// Custom hook to use ChatContext
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};

// Provider implementation
export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState<any[]>([]); // Stores user conversations
  const [messages, setMessages] = useState<{ [key: string]: any[] }>({}); // Stores messages for each user

  // API endpoints

  /**
   * Fetch all user conversations
   */
  const fetchConversations = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CONVERSATION);
      console.log("Fetched conversations:", response.data);
      setConversations(response.data?.conversations || []);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  /**
   * Fetch messages for a specific user
   * @param userToChatId - The user ID to fetch messages for
   */
  const fetchMessages = async (userToChatId: string) => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.GET_MESSAGES}/${userToChatId}`);
      console.log("Fetched messages:", response.data);
  
      setMessages((prev) => ({
        ...prev,
        [userToChatId]: response.data?.conversation?.messages || [],
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  

  /**
   * Send a message to a user
   * @param receiverId - The ID of the recipient
   * @param message - The message content
   */
  const sendMessage = async (receiverId: string, message: string) => {
    try {
      const response = await axiosInstance.post(`${API_ENDPOINTS.SENDMESSAGE}/${receiverId}`, {
        message,
      });
      console.log("Message sent successfully:", response.data);
  
      // Refresh messages after sending
      await fetchMessages(receiverId);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  /**
   * Initialize the conversations on mount
   */
  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        messages,
        fetchConversations,
        fetchMessages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
