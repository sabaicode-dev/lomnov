"use client";

import Image from "next/image";

interface ConversationListItemProps {
  id: string;
  name: string;
  profile: string;
  lastMessage?: string;
  unreadCount?: number;
  isSelected: boolean;
  onClick?: () => void;
  isOnline: boolean;
  personChat: string;
  timeChat: string;
}

export function ConversationList({
  name,
  profile,
  lastMessage,
  unreadCount,
  isSelected,
  onClick,
  isOnline,
  personChat,
  timeChat
}: ConversationListItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 hover:bg-[#b5b49e] rounded-lg cursor-pointer transition-colors ${
        isSelected ? "bg-gray-50 rounded-lg" : ""
      }`}
    >
      <div className="relative mr-3">
        <Image
          src={
            profile ||
            "https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
          }
          alt={name}
          className="rounded-full object-cover"
          width={40}
          height={40}
        />
        {isOnline ? (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        ) : (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold truncate text-[14px]">{name}</h3>
          <p className="text-[12px] text-gray-500 truncate">{timeChat}</p>
        </div>
        <div   className="flex justify-between items-center">
          <p className="text-[12px] text-gray-500 truncate">
            {personChat + " : "}{lastMessage || "not send message"}
          </p>
          {unreadCount && unreadCount > 0 ? (
            <span className="bg-blue-500 text-white text-[10px] px-1 py-0 rounded-full">
              {unreadCount}
            </span>
          ):""}
        </div>
      </div>
    </div>
  );
}
