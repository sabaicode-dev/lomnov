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
import socket from "@/libs/const/socketClient";
//==============================

const ChatPage: React.FC = () => {
  const { user } = useAuth();

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
  // const [userOnline , setUserOnline] = useState<User[]>([]);

  // Fetch conversations and extract lastMessage
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axiosInstance.get(API_ENDPOINTS.CONVERSATION);

        if (res.status === 200) {
          // Map through the users to extract the last message
          const conversations = res.data.conversationUser.users.map(
            (user: User) => {
              const lastMessage =
                user.message && user.message.length > 0
                  ? user.message[user.message.length - 1] // Get the last message text
                  : "No messages yet"; // Fallback for no messages

              return {
                ...user,
                lastMessage, // Add lastMessage dynamically
              };
            }
          );

          // Update the state with formatted conversation data
          setUserConversation({
            conversationUser: {
              users: conversations,
            },
            currentPage: res.data.currentPage || 1,
            totalPages: res.data.totalPages || 1,
            totalConversation:
              res.data.totalConversation || conversations.length,
          });
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  const LastMessage =
    userConversation?.conversationUser.users[0].message[0].message;
  console.log("Last message nna :::", LastMessage);

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
        `${API_ENDPOINTS.GET_MESSAGES}/${userToChatId}?page=${pageNum}&limit=10`
      );

      const newMessages = response.data.conversation.messages || [];
      const sortedMessages = newMessages.sort(
        (a: Message, b: Message) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setMessages((prevMessages) => [...sortedMessages, ...prevMessages]);
      setHasMore(newMessages.length > 0);

      if (pageNum === 1) {
        // Scroll to the bottom only when loading the first page of messages
        setTimeout(() => scrollToBottom("smooth"), 100);
      }
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
    setTimeout(() => scrollToBottom("smooth"), 100); // Ensure smooth scrolling after fetching messages
  };
  //====================
  // Send a message
  const handleSendMessage = async () => {
    if (!selectedConversation || !messageInput.trim()) return;

    const optimisticMessage: Message = {
      _id: Math.random().toString(36).substr(2, 9), // Generate a temporary ID
      senderId: user?.cognitoSub || "",
      receiverId: selectedConversation.cognitoSub,
      message: messageInput.trim(),
      conversationId: selectedConversation._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Optimistically update messages in the chat window
    setMessages((prevMessages) => [...prevMessages, optimisticMessage]);

    // Optimistically update the lastMessage and user.message in the conversation list
    setUserConversation((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        conversationUser: {
          users: prev.conversationUser.users.map((user) => {
            if (user.cognitoSub === selectedConversation.cognitoSub) {
              return {
                ...user,
                message: [...(user.message || []), optimisticMessage], // Add the message to the user's message array
                lastMessage: optimisticMessage.message, // Update lastMessage
              };
            }
            return user;
          }),
        },
      };
    });

    setMessageInput(""); // Clear the input field
    setTimeout(() => scrollToBottom("smooth"), 100); // Scroll to the bottom

    try {
      // Emit the message via socket
      socket.emit("sendMessage", optimisticMessage);

      // Optionally, sync with the backend (use the real message ID from the server if needed)
    } catch (error) {
      console.error("Error sending message:", error);

      // Revert the optimistic update in case of error
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== optimisticMessage._id)
      );

      setUserConversation((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          conversationUser: {
            users: prev.conversationUser.users.map((user) => {
              if (user.cognitoSub === selectedConversation.cognitoSub) {
                return {
                  ...user,
                  message: (user.message || []).filter(
                    (msg) => msg._id !== optimisticMessage._id
                  ), // Remove the failed message
                };
              }
              return user;
            }),
          },
        };
      });
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (newMessage: Message) => {
      // Append the new message to the chat window if it's the selected conversation
      if (selectedConversation?.cognitoSub === newMessage.senderId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }

      // Update the userConversation state to include the new message and update lastMessage
      setUserConversation((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          conversationUser: {
            users: prev.conversationUser.users.map((user) => {
              if (user.cognitoSub === newMessage.senderId) {
                return {
                  ...user,
                  message: [...(user.message || []), newMessage], // Append newMessage to user's message array
                  lastMessage: newMessage.message, // Update lastMessage
                };
              }
              return user;
            }),
          },
        };
      });

      // Scroll to the bottom if the message is for the selected conversation
      if (selectedConversation?.cognitoSub === newMessage.senderId) {
        setTimeout(() => scrollToBottom("smooth"), 100);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [scrollToBottom, selectedConversation]);

  //====================

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
    profileImage:
      selectedConversation?.profile?.[0] ||
      "https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    address: selectedConversation?.address || "No address available",
    phone: selectedConversation?.phoneNumber || "No phone number available",
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
            {userConversation?.conversationUser.users.map((user, index) => {
              // Helper function to truncate a message
              const truncateMessage = (
                message: string | undefined,
                maxLength = 25
              ): string => {
                if (!message) return "No messages yet"; // Fallback for no message
                return message.length > maxLength
                  ? message.slice(0, maxLength) + "..."
                  : message;
              };

              // Last message
              const lastMessage =
                user.message && user.message.length > 0
                  ? truncateMessage(
                      user.message[user.message.length - 1].message
                    )
                  : "No messages yet";

              // Determine personChat
              const personChat =
                user?.cognitoSub ===
                user.message?.[user.message.length - 1]?.receiverId
                  ? "you"
                  : user?.userName;

              return (
                <ConversationList
                  key={index}
                  id={user._id}
                  name={user.userName}
                  profile={user.profile[0]}
                  isSelected={selectedConversation?._id === user._id}
                  lastMessage={lastMessage} // Truncated message
                  unreadCount={2}
                  isOnline={
                    user.cognitoSub
                      ? context.onlineUsers[user.cognitoSub] === true
                      : false
                  }
                  onClick={() => handleSelectConversation(user)}
                  personChat={personChat} // Updated personChat logic
                />
              );
            })}
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
                  // className="flex-1 p-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thum-green-300 scrollbar-track-gray-300 overflow-y-auto chat-container h-[700px]"
                  className="flex-1 p-6 space-y-4 scroll-smooth overflow-y-auto h-[700px] chat-container rounded-lg mb-[8px] scrollbar-thin scrollbar-thumb-olive-green  scrollbar-track-gray-200"
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
                          src={
                            selectedConversation.profile[0] ||
                            "https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                          } // Replace with the selected conversation's profile image
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
                          src={
                            user.profile[0] ||
                            "https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                          } // Replace with your user's profile image source
                          alt="user"
                          className="w-10 h-10 rounded-full ml-3"
                          width={40}
                          height={40}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mx-4 border-2 rounded-[20px] border-olive-drab mt-[2px]">
                  <input
                    type="text"
                    placeholder="Write your message here..."
                    className="w-full p-2 border-none  bg-[#e0e0dc] rounded-[25px] text-black text-[12px] focus:outline-none focus:ring-0"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage(); // Call the send message function when Enter is pressed
                      }
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="py-2 px-4 rounded transition-all duration-200 bg-[#e0e0dc] mr-[5px]"
                  >
                    <IoSend className="text-olive-drab" />
                  </button>
                </div>
              </div>

              <div className="w-[30%] border-l-2 border-olive-green/50 h-[100%]">
                <ChatPropertyInfo userDetails={userDetail} />
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
