
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, Search } from "lucide-react";
import { ConversationList } from "@/components/organisms/chat/conversation-list/ConversationList";
import { ChatPropertyInfo } from "@/components/organisms/chat/chat-property-info/ChatPropertyInfo";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import Loading from "@/components/atoms/loading/Loading";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { useSocketContext } from "@/context/socketContext";
import {
  Message,
  User,
  UserConversation,
} from "@/libs/types/chat/user-conversation";
import { useAuth } from "@/context/user";
import { useChatContext } from "@/hook/useChat";
import socket from "@/libs/const/socketClient";
//==============================

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const { sendMessage } = useChatContext();

  const messageRef = useRef<HTMLDivElement>(null);
  const context = useSocketContext();
  const [userConversation, setUserConversation] = useState<UserConversation>();
  const [selectedConversation, setSelectedConversation] = useState<User | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);

  // Fetch conversations
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

  // Scroll to the bottom of the chat
  const scrollToBottom = useCallback((behavior: "smooth" | "auto" = "auto") => {
    if (messageRef.current) {
      messageRef.current.scrollTo({
        top: messageRef.current.scrollHeight,
        behavior: behavior,
      });
    }
  }, []);

  // Fetch messages for selected conversation
  const fetchMessages = async (userToChatId: string, pageNum: number) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `${API_ENDPOINTS.GET_MESSAGES}/${userToChatId}?page=${pageNum}&limit=9`
      );

      const newMessages = response.data.conversation.messages || [];
      const sortedMessages = newMessages.sort(
        (a: Message, b: Message) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setMessages((prevMessages) => [...sortedMessages, ...prevMessages]);
      setHasMore(newMessages.length > 0);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Select a conversation
  const handleSelectConversation = async (conversation: User) => {
    if (selectedConversation?._id === conversation._id) return;

    setSelectedConversation(conversation);
    setMessages([]);
    setPage(1);
    setHasMore(true);
    await fetchMessages(conversation.cognitoSub, 1);
    scrollToBottom();
  };

  // Send a message
  const handleSendMessage = async () => {
    if (!selectedConversation || !messageInput.trim()) return;

    const optimisticMessage: Message = {
      _id: Math.random().toString(36).substr(2, 9),
      senderId: user?.cognitoSub || "",
      receiverId: selectedConversation.cognitoSub,
      message: messageInput.trim(),
      conversationId: selectedConversation._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
    setMessageInput("");
    setTimeout(scrollToBottom, 50);

    try {
      await sendMessage(selectedConversation.cognitoSub, messageInput.trim());
      socket.emit("sendMessage", optimisticMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== optimisticMessage._id)
      );
    }
  };

  // Real-time message listener
  useEffect(() => {
    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [scrollToBottom]);

  // Fetch older messages when scrolling
  useEffect(() => {
    const messageContainer = messageRef.current;

    const handleScroll = async () => {
      if (!messageContainer) return;

      const isNearTop = messageContainer.scrollTop === 0;

      if (isNearTop && !loading && hasMore && selectedConversation) {
        const nextPage = page + 1;
        try {
          const previousScrollHeight = messageContainer.scrollHeight;

          await fetchMessages(selectedConversation.cognitoSub, nextPage);

          const newScrollHeight = messageContainer.scrollHeight;
          const scrollHeightDifference = newScrollHeight - previousScrollHeight;

          messageContainer.scrollTop = scrollHeightDifference;
          setPage(nextPage);
        } catch (error) {
          console.error("Error fetching older messages:", error);
        }
      }
    };

    if (messageContainer) {
      messageContainer.addEventListener("scroll", handleScroll);
      return () => {
        messageContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [selectedConversation, page, loading, hasMore, fetchMessages]);

  const userDetail = {
    name: selectedConversation?.userName || "Unknown",
    email: selectedConversation?.email || "No email",
    profileImage: selectedConversation?.profile?.[1] || "/default-profile.png",
    address: selectedConversation?.address || "No address available",
    phone: selectedConversation?.phoneNumber || "No phone number available",
  };

  const propertyDetail = {
    image:
      "https://th.bing.com/th/id/OIP.nmY2o1MdUEMRBhFkRVxkyAHaGF?w=281&h=182&c=7&r=0&o=5&pid=1.7",
    type: user?.address,
    bedroom: user?.address,
    bathroom: user?.address,
    spacious: user?.address,
    parking: user?.address,
  };

  return (
    <div className="h-screen">
      <div className="w-[100%] bg-[#79826A] h-[90px]"></div>
      <div className="flex justify-between h-screen">
        {/* Conversations Sidebar */}
        <div className="h-[90%] w-[20%] p-4 border-r-2 border-olive-green/50 z-[1]">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Chats</h2>
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search chat"
                className="w-full border-none rounded-[12px] py-2 pl-10 pr-4 focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
            </div>
          </div>
          <div className="overflow-y-auto">
            {userConversation?.conversationUser.users.map((user, index) => (
              <ConversationList
                key={index}
                id={user._id}
                name={user.userName}
                profile={user.profile[0]}
                isSelected={selectedConversation?._id === user._id}
                isOnline={
                  selectedConversation?.cognitoSub
                    ? context.onlineUsers[selectedConversation.cognitoSub] ===
                      true
                    : false
                }
                onClick={() => handleSelectConversation(user)}
              />
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div
          className={`flex flex-col h-[85%] ${
            showPropertyInfo ? "w-[55%]" : "w-[80%]"
          }`}
        >
          {selectedConversation ? (
            <div className="flex justify-between">
              <div className="w-[100%]">
                <div
                  className="flex-1 p-4 space-y-4 overflow-y-auto chat-container h-[700px]"
                  ref={messageRef}
                >
                  {loading && (
                    <div className="flex justify-center">
                      <Loading />
                    </div>
                  )}
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex items-start ${
                        message.senderId === user?.cognitoSub
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.senderId !== user?.cognitoSub && (
                        <Image
                          src={selectedConversation.profile[1]} // Replace with the selected conversation's profile image
                          alt="user"
                          className="w-10 h-10 rounded-full mr-3"
                          width={40}
                          height={40}
                        />
                      )}
                      <div
                        className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                          message.senderId === user?.cognitoSub
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs mt-1">
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.senderId === user?.cognitoSub && (
                        <Image
                          src={user.profile[1]} // Replace with your user's profile image source
                          alt="user"
                          className="w-10 h-10 rounded-full ml-3"
                          width={40}
                          height={40}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center mx-4 border-2 rounded-[20px] border-olive-drab relative">
                  <input
                    type="text"
                    placeholder="Write your message here..."
                    className="w-full p-2 border-none bg-[#e0e0dc] rounded-[25px] text-[12px]"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="py-2 px-4 rounded transition-all duration-200 bg-[#e0e0dc] absolute ml-[970px]"
                  >
                    <IoSend className="text-olive-drab" />
                  </button>
                </div>
              </div>

              <div className="w-[30%] border-l-2 border-olive-green/50 h-[100%]">
                <ChatPropertyInfo
                  userDetails={userDetail}
                  propertyDetails={propertyDetail}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-grow text-gray-500">
              <div className="text-center">
                <MessageCircle
                  size={64}
                  className="mx-auto mb-4 text-gray-400"
                />
                <h2 className="text-xl font-semibold">Welcome to Messages</h2>
                <p className="mt-2 text-gray-400">
                  Select a conversation to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
