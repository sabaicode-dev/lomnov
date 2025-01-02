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
import { Messages, User, UserConversation } from "@/libs/types/chat/user-conversation";
import { useAuth } from "@/context/user";
import { Message } from "postcss";

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [userConversation, setUserConversation] = useState<UserConversation>();
  const [selectedConversation, setSelectedConversation] = useState<User | null>(null);
  const [messages, setMessages] = useState<Messages>();
  const [senderMessage, setSenderMessage] = useState<Message[]>([]);
  const [receiverMessage, setReceiverMessge] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  //** My Profile */
  const meProfile = user;
  console.log("meProfile", meProfile);

  const handleSelectConversation = (conversation: User) => {
    setSelectedConversation(conversation);
    setShowPropertyInfo(!!conversation.propertyDetails); // Show property info if it exists
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      _id: Date.now().toString(),
      senderId: "user1",
      receiverId: selectedConversation?._id || "",
      message: messageInput,
      conversationId: selectedConversation?._id || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    //setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
    setTimeout(() => {
      messageRef.current?.scrollTo({
        top: messageRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    const handleFechedConversations = async () => {
      try {
        const res = await axiosInstance.get(API_ENDPOINTS.CONVERSATION);
        if (res.status === 200) {
          setUserConversation(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleFetchedMessages = async () => {
      if (selectedConversation) {
        try {
          const res = await axiosInstance.get(`${API_ENDPOINTS.GET_MESSAGES}/${selectedConversation.cognitoSub}`);
          console.log("messages:", res.data);
          setMessages(res.data as Messages);
        } catch (error) {
          console.error(error);
        }
      }
    };

    handleFechedConversations();
    handleFetchedMessages();
  }, [selectedConversation]);
  useEffect(() => {
    const handleFilterMessage = () => {
      if (messages) {
        const sender = messages.conversation.messages?.filter((message) => {
          return message.senderId === user?.cognitoSub;
        }) as unknown as Message[]; // Ensure type compatibility
        const receiver = messages.conversation.messages?.filter((msg) => {
          return msg.senderId !== user?.cognitoSub;
        }) as unknown as Message[]; // Ensure type compatibility
        setSenderMessage(sender); // Directly set the filtered array
        setReceiverMessge(receiver)
      }
    };

    handleFilterMessage();
  }, [messages, user?.cognitoSub]);
  console.log(senderMessage);

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
      <div className={`flex flex-col ${showPropertyInfo ? "w-[55%]" : "w-[80%]"}`}>
        {selectedConversation ? (
          <>
            <ChatHeader
              name={selectedConversation.userName}
              profile={selectedConversation.profile[0]}
              onBack={() => setSelectedConversation(null)}
              isOnline={true} // Mock online status
            />
            <div className="flex-1 h-full p-4 space-y-4 overflow-y-auto chat-container" ref={messageRef}>
              {/* Sender Messages  */}
              {messages?.conversation.messages.map((message) => (
                <ChatMessageList
                  key={message._id}
                  message={message.message}
                  timestamp={message.createdAt}
                  isCurrentUser={message.senderId === "user1"} // Mock current user
                  profile={message.senderId === user?.cognitoSub ?  user?.profile[0] as string : selectedConversation.profile[0] as string}
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
              <MessageCircle size={64} className="mx-auto mb-4 text-[#b8a852]" />
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