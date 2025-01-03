"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Search } from "lucide-react";
import { ChatInput } from "@/components/organisms/chat/chat-input/ChatInput";
import { ChatHeader } from "@/components/organisms/chat/chat-header/ChatHeader";
import { ConversationList } from "@/components/organisms/chat/conversation-list/ConversationList";
import { ChatMessageList } from "@/components/organisms/chat/chat-message-list/ChatMessageList";
import { ChatPropertyInfo } from "@/components/organisms/chat/chat-property-info/ChatPropertyInfo";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import {
  Messages,
  User,
  UserConversation,
} from "@/libs/types/chat/user-conversation";
import { useAuth } from "@/context/user";
import { useChatContext } from "@/hook/useChat";

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [userConversation, setUserConversation] = useState<UserConversation>();
  const [selectedConversation, setSelectedConversation] = useState<User | null>(
    null
  );
  const [messages, setMessages] = useState<Messages | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  const { sendMessage } = useChatContext();

  const messageRef = useRef<HTMLDivElement>(null);

  //** Fetch Conversations */
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axiosInstance.get(API_ENDPOINTS.CONVERSATION);
        if (res.status === 200) {
          setUserConversation(res.data);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  //** Fetch Messages for Selected Conversation */
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation) {
        try {
          const res = await axiosInstance.get(
            `${API_ENDPOINTS.GET_MESSAGES}/${selectedConversation.cognitoSub}`
          );
          if (res.status === 200) {
            setMessages(res.data as Messages);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  //** Handle Send Message */
  const handleSendMessage = async () => {
    if (!selectedConversation || !messageInput.trim()) return;

    const newMessage = {
      _id: Math.random().toString(36).substr(2, 9), // Temporary ID
      senderId: user?.cognitoSub,
      receiverId: selectedConversation.cognitoSub,
      message: messageInput.trim(),
      createdAt: new Date().toISOString(),
    };

    // Optimistically update messages
    setMessages((prevMessages) => {
      if (!prevMessages) {
        return { conversation: { messages: [newMessage] } } as Messages;
      }
      return {
        ...prevMessages,
        conversation: {
          ...prevMessages.conversation,
          messages: [...prevMessages.conversation.messages, newMessage],
        },
      };
    });

    try {
      // Send message to backend
      await sendMessage(selectedConversation.cognitoSub, messageInput.trim());
      setMessageInput(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  //** Handle Select Conversation */
  const handleSelectConversation = (conversation: User) => {
    setSelectedConversation(conversation);
    setShowPropertyInfo(!!conversation.propertyDetails);
  };

  return (
    <div className="flex h-screen bg-[#D9D9D9]">
      {/* Conversations Sidebar */}
      <div className="h-full bg-[#D9D9D9] w-[20%] p-4 border-r-[1px] border-gray-400">
        <div className="mb-4 mt-20">
          <h2 className="text-xl font-bold">Chats</h2>
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
          {userConversation?.conversationUser.users.map((user, index) => (
            <ConversationList
              key={index}
              id={user._id}
              name={user.userName}
              profile={user.profile[0]}
              isSelected={selectedConversation?._id === user._id}
              isOnline={true} // Mock online status
              onClick={() => handleSelectConversation(user)}
            />
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`flex flex-col ${showPropertyInfo ? "w-[55%]" : "w-[80%]"}`}
      >
        {selectedConversation ? (
          <>
            <ChatHeader
              name={selectedConversation.userName}
              profile={selectedConversation.profile[0]}
              onBack={() => setSelectedConversation(null)}
              isOnline={true} // Mock online status
            />
            <div
              className="flex-1 h-full p-4 space-y-4 overflow-y-auto chat-container"
              ref={messageRef}
            >
              {messages?.conversation.messages.map((message) => (
                <ChatMessageList
                  key={message._id}
                  message={message.message}
                  timestamp={message.createdAt}
                  isCurrentUser={message.senderId === user?.cognitoSub}
                  profile={
                    message.senderId === user?.cognitoSub
                      ? user?.profile[1]
                      : selectedConversation.profile[1]
                  }
                />
              ))}
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Write your message here..."
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-olive-drab text-white py-2 px-4 rounded hover:bg-neutral hover:text-gray-600 transition-all duration-200 ease-in-out"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow text-gray-500">
            <div className="text-center">
              <MessageCircle
                size={64}
                className="mx-auto mb-4 text-[#b8a852]"
              />
              <h2 className="text-xl font-semibold">Welcome to Messages</h2>
              <p className="mt-2 text-gray-400">
                Select a conversation to start chatting
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Property Sidebar */}
      {showPropertyInfo && selectedConversation?.propertyDetails && (
        <div className="w-[25%] border-l-[1px] border-gray-400">
          <ChatPropertyInfo
            propertyDetails={selectedConversation.propertyDetails}
            userDetails={{
              name: selectedConversation.userName,
              email: "example@example.com",
              phone: "012-345-678",
              address: "Phnom Penh, Cambodia",
              profileImage: selectedConversation.profile[0],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
