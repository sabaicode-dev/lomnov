"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { MessageCircle, Search } from "lucide-react";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { ChatInput } from "@/components/organisms/chat/chat-input/ChatInput";
import { ChatHeader } from "@/components/organisms/chat/chat-header/ChatHeader";
import { ConversationList } from "@/components/organisms/chat/conversation-list/ConversationList";
import { ChatMessageList } from "@/components/organisms/chat/chat-message-list/ChatMessageList";
import { ChatPropertyInfo } from "@/components/organisms/chat/chat-property-info/ChatPropertyInfo";
import { useAuth } from "@/context/user";
import { Input } from "@/components/atoms/input/Input";
import Spinner from "@/components/atoms/spinner/Spinner";
import { useSocketContext } from "@/context/socketContext";
import socket from "@/libs/const/socketClient";

interface Conversation {
  _id: string;
  receiver: string;
  messages: string[];
  updatedAt: string;
  phoneNumber: string;
  role: string;
  email: string;
  profile: string;
  name: string;
  address: string;
  details?: {
    image: string;
    type: string;
    bedroom: string;
    bathroom: string;
    spacious: string;
    parking: string;
  };
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const socketContext = useSocketContext();
  const onlineUsers = socketContext?.onlineUsers || [];
  const messageRef = useRef<HTMLDivElement>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);

  const sortMessages = (msgs: Message[]): Message[] => {
    return [...msgs].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

  const fetchConversations = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.CONVERSATION}`
        // `${process.env.NEXT_PUBLIC_API_URL}/v1/messages/get/conversations`
      );
      setConversations(response.data.conversations);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  }, []);

  const scrollToBottom = useCallback((behavior: "smooth" | "auto" = "auto") => {
    if (messageRef.current) {
      messageRef.current.scrollTo({
        top: messageRef.current.scrollHeight,
        behavior: behavior,
      });
    }
  }, []);

  const fetchMessages = async (
    userToChatId: string,
    pageNum: number,
    isNewConversation: boolean = false
  ) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.GET_MESSAGES}/${userToChatId}?page=${pageNum}&limit=14`
        // `${process.env.NEXT_PUBLIC_API_URL}/v1/messages/${conversationId}?page=${pageNum}&limit=14`
      );
      const newMessages = response.data.conversation.messages;

      setMessages((prevMessages) => {
        if (isNewConversation) {
          return sortMessages(newMessages);
        }

        const combinedMessages = [
          ...newMessages.filter(
            (msg: { _id: string }) =>
              !prevMessages.some((existingMsg) => existingMsg._id === msg._id)
          ),
          ...prevMessages,
        ];

        return sortMessages(combinedMessages);
      });

      setHasMore(newMessages.length > 0);
      setPage(pageNum);

      if (isNewConversation) {
        setTimeout(() => scrollToBottom("smooth"), 100);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = async (conversation: Conversation) => {
    if (selectedConversation && selectedConversation?._id === conversation._id)
      return;
    setSelectedConversation(conversation);
    setMessages([]);
    setPage(1);
    setHasMore(true);
    setShowPropertyInfo(false); // Reset property info visibility
    await fetchMessages(conversation.receiver, 1, true);
  };

  const handleSelectMessage = () => {
    setShowPropertyInfo(true); // Show property info when a message is clicked
  };

  const handleSendMessage = async () => {
    if (!selectedConversation || messageInput.trim() === "") return;

    const optimisticMessage: Message = {
      _id: Date.now().toString(),
      senderId: user?._id || "",
      receiverId: selectedConversation.receiver,
      message: messageInput,
      conversationId: selectedConversation._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      setMessages((prevMessages) =>
        sortMessages([...prevMessages, optimisticMessage])
      );
      setMessageInput("");
      setTimeout(() => scrollToBottom("smooth"), 100);
      socket.emit("sendMessage", optimisticMessage);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== optimisticMessage._id)
      );
      setMessageInput(optimisticMessage.message);
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => sortMessages([...prevMessages, newMessage]));
      scrollToBottom();
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [scrollToBottom]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return (
    <div className="flex h-screen bg-[#D9D9D9]">
      {/* Conversations Sidebar */}
      <div className="h-full bg-[#D9D9D9] w-[20%] p-4 border-r-[1px] border-gray-400">
        <div className="mb-4 mt-20">
          <h2 className="text-lg font-bold">Chats</h2>
            <div className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search chat"
                  className="w-full bg-[#d9d9d9] rounded-md py-2 pl-10 pr-4 focus:outline-none" 
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"> 
                  <Search className="text-gray-400" size={20} />
                </div>
            </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-100px)]">
          {conversations.map((conversation) => (
            <ConversationList
              key={conversation._id}
              id={conversation._id}
              name={conversation.name}
              profile={conversation.profile}
              isSelected={selectedConversation?._id === conversation._id}
              isOnline={onlineUsers.includes(conversation.receiver)}
              onClick={() => handleSelectConversation(conversation)}
            />
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex flex-col ${showPropertyInfo ? "w-[55%]" : "w-[80%]"}`}>
        {selectedConversation ? (
          <>
            <ChatHeader
              name={selectedConversation.name}
              profile={selectedConversation.profile}
              onBack={() => setSelectedConversation(null)}
              isOnline={onlineUsers.includes(selectedConversation.receiver)}
            />
            <div
              className="flex-1 h-full p-4 space-y-4 overflow-y-auto chat-container"
              ref={messageRef}
            >
              {loading && page > 1 && (
                <Spinner className="text-[#b5b49e]">
                  <span className="text-sm text-[#b5b49e]">
                    Loading messages...
                  </span>
                </Spinner>
              )}
              {!hasMore && (
                <div className="py-4 text-center text-gray-500">
                  No more messages
                </div>
              )}
              {messages.map((message) => (
                <ChatMessageList
                  key={message._id}
                  message={message.message}
                  timestamp={message.createdAt}
                  isCurrentUser={message.senderId === user?._id}
                  profile={selectedConversation.profile}
                  onClick={handleSelectMessage} // Add click handler to show property info
                />
              ))}
            </div>

            <ChatInput
              value={messageInput}
              onChange={setMessageInput}
              onSend={handleSendMessage}
            />
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow text-gray-500">
            <div className="text-center">
              <MessageCircle size={64} className="mx-auto mb-4 text-[#7d7757]" />
              <h2 className="text-xl font-semibold">Welcome to Messages</h2>
              <p className="mt-2 text-gray-400">
                Select a conversation to start chatting
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Property Sidebar */}
      {showPropertyInfo && selectedConversation?.details && (
        <div className="w-[25%] border-l-[1px] border-gray-400">
          <ChatPropertyInfo
            propertyDetails={selectedConversation.details}
            userDetails={{
              name: selectedConversation.name,
              email: selectedConversation.email, // Replace with dynamic data
              phone: selectedConversation.phoneNumber, // Replace with dynamic data
              address: selectedConversation.address, // Replace with dynamic data
              profileImage: selectedConversation.profile,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatPage;