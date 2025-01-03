"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Banner from "@/components/molecules/banner/Banner";
import VisitProfileNavigation from "../visit-profile-navigation/VisitProfileNavigation";
import { IoCall } from "react-icons/io5";
import { BiLogoMessenger } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import { VisitProfileHeaderProps } from "@/libs/types/user-types/user";
import { formatDate } from "@/libs/functions/formatDate";
import SharesToSocial from "@/components/atoms/shares-social/SharesToSocial";
import { useChatContext } from "@/hook/useChat";
import { useAuth } from "@/context/user";
import { ChatMessageList } from "@/components/organisms/chat/chat-message-list/ChatMessageList";
import { Messages, User, UserConversation } from "@/libs/types/chat/user-conversation";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { ConversationList } from "@/components/organisms/chat/conversation-list/ConversationList";

const VisitProfileHeader = ({ user }: { user: VisitProfileHeaderProps }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userConversation, setUserConversation] = useState<UserConversation>();
  const { fetchMessages,messages,  sendMessage } = useChatContext();
  const { user: currentUser } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<User | null>(null);
  const [messagess , setMessages] = useState<Messages>();
    const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  //=========================================

  // Toggle Dropdown
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Toggle Chat Popup
  const toggleChat = async () => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen && currentUser?._id) {
    
      
    
    }
  };

    const handleSelectConversation = (conversation: User) => {
      setSelectedConversation(conversation);
      setShowPropertyInfo(!!conversation.propertyDetails); // Show property info if it exists
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

  // Handle Outside Clicks for Dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
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

  //send messsage

  

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Send Message Handler
  const handleSendMessage = async () => {
    if (message.trim() && user?.user?.cognitoSub && currentUser?.cognitoSub) {
      const data = await sendMessage(user.user.cognitoSub, message); // Ensure senderId is set in the backend
      console.log("message send success:::",data);
      setMessage(""); // Clear the input after sending
    }
  };

  const cognitosub = user?.user?.cognitoSub;

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
                {user?.user?.userName ?? "Unknown"}
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
            <button
              className="py-[5px] px-[24px] flex items-center justify-center rounded-[8px] bg-olive-drab text-white hover:bg-neutral hover:text-gray-600 transition-all duration-200 ease-in-out"
              onClick={toggleChat}
            >
              <BiLogoMessenger className="w-5 h-5 mr-[8px]" />
              Chat Now
            </button>
            <button
              onClick={() => window.open(`tel:${user?.user?.phoneNumber ?? ""}`)}
              className="py-[5px] px-[24px] flex items-center justify-center rounded-[8px] bg-olive-drab text-white hover:bg-neutral hover:text-gray-600 transition-all duration-200 ease-in-out"
            >
              <IoCall className="w-5 h-5 mr-[8px]" />
              Call Now
            </button>

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

      <VisitProfileNavigation cognitosub={cognitosub!} />

      {isChatOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
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
                <div >
                  <h2 className="text-lg font-semibold">
                    {user?.user?.userName ?? "Unknown"}
                  </h2>
                  <p className="text-[12px] text-gray-600">Online</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col space-y-4 overflow-y-auto max-h-[300px]">
              {/*message list*/}
            <h1>Hello</h1>
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Write your message here..."
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-olive-drab text-white py-2 px-4 rounded hover:bg-neutral hover:text-gray-600 transition-all duration-200 ease-in-out"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VisitProfileHeader;
