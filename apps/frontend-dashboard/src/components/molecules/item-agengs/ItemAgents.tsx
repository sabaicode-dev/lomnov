"use client";
import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AgentResponseType } from "@/libs/types/api-agents/agent-response";
import { formatDate } from "@/libs/functions/formatDate";
import CardUser from "@/components/atoms/card-user/CardUser";
import CardEmail from "@/components/atoms/card-email/CardEmail";
import CardDate from "@/components/atoms/card-date/CardDate";
import Link from "next/link";
import { toSubstring } from "@/libs/functions/toSubstring";

//==================================
interface PropType {
  item: AgentResponseType;
  onDelete: (id: string) => void;
}

const ItemAgents = ({ item, onDelete }: PropType) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleDeleteClick = () => {
    setIsPopupVisible(true);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleConfirmDelete = () => {
    onDelete(item._id);
    setIsPopupVisible(false);
  };

  return (
    <div className="w-full h-[68px] px-3 py-2 flex justify-between border bg-BgSoftWhite/50 border-Primary/10">
      <div className="flex justify-start items-center w-1/5 gap-10">
        <p>{toSubstring(item._id, 4)}</p>
        <CardUser usernname={item.userName} image={item.profile[0]} />
      </div>
      <div className="flex justify-between items-center w-[65%]">
        <div className="w-[200px] flex justify-start">
          <p>{item.address}</p>
        </div>
        <CardEmail email={item.email} />
        <div className="w-[200px] flex justify-start">
          <p>{item.phoneNumber}</p>
        </div>
        <CardDate datetime={formatDate(item.updatedAt)} />
      </div>
      <div className="flex items-center justify-around gap-[5px] w-[5%]">
        <Link href={`/dashboard/view-agents/${item._id}`}>
          <div className="p-1 w-6 h-6 bg-Primary/20 rounded cursor-pointer">
            <MdOutlineRemoveRedEye className="text-sm text-Primary" />
          </div>
        </Link>
        <div className="p-1 w-6 h-6 bg-Negative/20 rounded cursor-pointer">
          <RiDeleteBin6Line
            className="text-sm text-Negative"
            onClick={handleDeleteClick}
          />
        </div>
      </div>
      {isPopupVisible && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">Delete {item.userName}?</h3>
            <p className="mb-4">Are you sure you want to delete this agent?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemAgents;
