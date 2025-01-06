"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Banner from "@/components/molecules/banner/Banner";
import VisitProfileNavigation from "../visit-profile-navigation/VisitProfileNavigation";
import { IoCall } from "react-icons/io5";
import { BiLogoMessenger } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import { VisitProfileHeaderProps } from "@/libs/types/user-types/user";
import { formatDate } from "@/libs/functions/formatDate";
import SharesToSocial from "@/components/atoms/shares-social/SharesToSocial";
import { useAuth } from "@/context/user";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import Loading from "@/components/atoms/loading/Loading";
import { IoSend } from "react-icons/io5";
import { useChatContext } from "@/hook/useChat";
import { GrFormClose } from "react-icons/gr";
import socket from "@/libs/const/socketClient";
import { useSocketContext } from "@/context/socketContext";
import { Message, UserConversation } from "@/libs/types/chat/user-conversation";

//=================================================

const VisitProfileHeader = ({ user }: { user: VisitProfileHeaderProps }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user: currentUser } = useAuth();
  const { sendMessage } = useChatContext();
  const context = useSocketContext();
  const messageRef = useRef<HTMLDivElement>(null);

  const [userConversation, setUserConversation] = useState<UserConversation>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  //=========================================

  // Toggle Dropdown
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messageRef.current) {
      messageRef.current.scrollTo({
        top: messageRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  // Scroll to top detection for fetching more messages
  useEffect(() => {
    const handleScroll = async () => {
      if (!messageRef.current || loading || !hasMore) return;

      if (messageRef.current.scrollTop === 0) {
        const nextPage = page + 1;
        try {
          setLoading(true);
          await fetchMessages(user.user?.cognitoSub || "", nextPage);
          setPage(nextPage);
        } catch (error) {
          console.error("Error fetching more messages:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    const currentRef = messageRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, [loading, hasMore, page, user.user?.cognitoSub]);

  // Toggle Chat Popup
  const toggleChat = async () => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen && user.user?._id) {
      await fetchMessages(user.user.cognitoSub, 1);
    }
  };

  // Fetch messages for the selected user
  const fetchMessages = async (userCognitoSub: string, pageNum = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.GET_MESSAGES}/${userCognitoSub}?page=${pageNum}&limit=20`
      );
      const fetchedMessages = response.data.conversation.messages || [];

      if (fetchedMessages.length === 0) {
        setHasMore(false);
      }

      setMessages((prevMessages) => [...fetchedMessages, ...prevMessages]);
      if (pageNum === 1) setTimeout(scrollToBottom, 50);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Send a message
  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    const optimisticMessage: Message = {
      _id: Math.random().toString(36).substr(2, 9),
      senderId: currentUser?.cognitoSub || "",
      receiverId: user.user?.cognitoSub || "",
      message: messageInput.trim(),
      conversationId: user.user?._id || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
    setMessageInput("");
    setTimeout(scrollToBottom, 50);

    try {
      await sendMessage(user.user?.cognitoSub || "", optimisticMessage.message);
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

  const isCurrentUser = currentUser?.cognitoSub === user.user?.cognitoSub;

  return (
    <>
      <div className="relative">
        <Banner
          background={
            user?.user?.background?.[user?.user?.background.length - 1] ??
            "/images/default-banner.jpg"
          }
        />
        <div className="max-w-[1300px] mx-auto relative">
          <div className="flex items-center pl-[10px] xl:pl-0 mt-[30px]">
            <div className="absolute flex items-center justify-center sm:w-[135px] sm:h-[135px] w-[125px] h-[125px] rounded-full bg-grayish-white">
              <div className="sm:w-[125px] sm:h-[125px] w-[120px] h-[120px] rounded-full overflow-hidden bg-grayish-white">
                <Image
                  src={
                    user?.user?.profile?.[user?.user?.profile.length - 1] ??
                    "/images/default-profile.jpg"
                  }
                  alt="user"
                  width={125}
                  height={125}
                />
              </div>
            </div>
            <div className="absolute left-[170px] items-center text-helvetica-small font-helvetica text-olive-gray mt-[10px]">
              <span className="font-helvetica text-helvetica-h4 font-bold text-charcoal capitalize">
                {isCurrentUser
                  ? "My Profile"
                  : user?.user?.userName ?? "Unknown"}
              </span>
              <span className="flex items-center mt-[10px]">
                Joined
                <div className="w-[5px] h-[5px] mx-[5px] rounded-full bg-olive-gray"></div>
                {user?.user?.createdAt
                  ? formatDate(user?.user?.createdAt)
                  : "Unknown date"}
              </span>
            </div>
          </div>

          <div className="flex absolute justify-end right-0 -bottom-[120px] space-x-[10px] items-center font-helvetica text-helvetica-paragraph text-charcoal pr-[10px] xl:pr-0">
            {!isCurrentUser && (
              <>
                <button
                  className="py-[5px] px-[24px] flex items-center justify-center rounded-[8px] bg-olive-drab text-white hover:bg-neutral hover:text-gray-600 transition-all duration-200 ease-in-out"
                  onClick={toggleChat}
                >
                  <BiLogoMessenger className="w-5 h-5 mr-[8px]" />
                  Chat Now
                </button>
                <button
                  onClick={() =>
                    window.open(`tel:${user?.user?.phoneNumber ?? ""}`)
                  }
                  className="py-[5px] px-[24px] flex items-center justify-center rounded-[8px] bg-olive-drab text-white hover:bg-neutral hover:text-gray-600 transition-all duration-200 ease-in-out"
                >
                  <IoCall className="w-5 h-5 mr-[8px]" />
                  Call Now
                </button>
              </>
            )}
            <div className="relative" ref={dropdownRef}>
              <button
                className="py-[5px] px-[24px] flex items-center justify-center rounded-[8px] bg-olive-drab text-white hover:bg-neutral hover:text-gray-600 transition-all duration-200 ease-in-out"
                onClick={toggleDropdown}
              >
                <FaShareAlt className="mr-[8px]" />
                Share
              </button>
              {isDropdownOpen && (
                <SharesToSocial linkURL={window.location.href} />
              )}
            </div>
          </div>
        </div>
      </div>

      <VisitProfileNavigation cognitosub={user.user?.cognitoSub!} />
      {/* Chat */}
      {isChatOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-4">
            <div className="flex justify-between items-center   shadow-md">
              <div className="flex items-center ">
                <Image
                  src={
                    user?.user?.profile?.[user?.user?.profile.length - 1] ??
                    "/images/default-profile.jpg"
                  }
                  alt="user"
                  className="w-10 h-10 rounded-full mr-3"
                  width={40}
                  height={40}
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {isCurrentUser
                      ? "My Profile"
                      : user?.user?.userName ?? "Unknown"}
                  </h2>
                  <p
                    className={`text-[12px] ${
                      user.user?.cognitoSub &&
                      user.user.cognitoSub in context.onlineUsers &&
                      context.onlineUsers[user.user.cognitoSub]
                        ? "text-green-500"
                        : "text-gray-600"
                    }`}
                  >
                    {user.user?.cognitoSub &&
                    user.user.cognitoSub in context.onlineUsers &&
                    context.onlineUsers[user.user.cognitoSub]
                      ? "online"
                      : "offline"}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700"
              >
                <GrFormClose className="text-[30px]" />
              </button>
            </div>
            <div
              className="w-[100%] h-[320px] overflow-y-auto"
              ref={messageRef}
            >
              {loading ? (
                <div className="flex items-center justify-center mt-[130px]">
                  <Loading />
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex items-start ${
                      message.senderId === currentUser?.cognitoSub
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.senderId !== currentUser?.cognitoSub && (
                      <Image
                        src={
                          user?.user?.profile?.[
                            user?.user?.profile.length - 1
                          ] ?? "/images/default-profile.jpg"
                        }
                        alt="user"
                        className="w-8 h-8 rounded-full mr-3 mt-[10px]"
                        width={40}
                        height={40}
                      />
                    )}
                    <div
                      className={`max-w-[75%] p-3 mt-[10px] rounded-lg shadow-md ${
                        message.senderId === currentUser?.cognitoSub
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
                    {message.senderId === currentUser?.cognitoSub && (
                      <Image
                        src={
                          currentUser.profile[currentUser.profile.length - 1] ??
                          "/images/default-profile.jpg"
                        } // Replace with your user's profile image source
                        alt="user"
                        className="w-8 h-8 rounded-full ml-3 mt-[10px]"
                        width={40}
                        height={40}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg p-2 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-olive-green text-white p-2 rounded-lg"
              >
                <IoSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VisitProfileHeader;
