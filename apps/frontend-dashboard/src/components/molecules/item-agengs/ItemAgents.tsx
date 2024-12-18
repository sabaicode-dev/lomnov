"use client";
import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AgentResponseType } from "@/libs/types/api-agents/agent-response";
import { formatDate } from "@/libs/functions/formatDate";
import CardUser from "@/components/atoms/card-user/CardUser";
import CardEmail from "@/components/atoms/card-email/CardEmail";
import CardDate from "@/components/atoms/card-date/CardDate";
import Link from "next/link";

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
        <p>{item._id}</p>
        <CardUser usernname={item.userName} image={item.profile[0]} />
      </div>
      <div className="flex justify-between items-center w-3/5">
        <div className="w-[200px] flex justify-start">
          <p>{item.address}</p>
        </div>
        <CardEmail email={item.email} />
        <div className="w-[200px] flex justify-start">
          <p>{item.phoneNumber}</p>
        </div>
        <CardDate datetime={formatDate(item.updatedAt)} />
      </div>
      <div className="flex items-center justify-between gap-3 w-1/5">
        <Link href={`/dashboard/view-agents/${item._id}`}>
          <div className="p-1 w-6 h-6 bg-Primary/20 rounded">
            <MdOutlineRemoveRedEye className="text-sm text-Primary" />
          </div>
        </Link>
        <Link href={`/dashboard/update-agents?id=${item._id}`}>
          <div className="p-1 w-6 h-6 bg-Positive/20 rounded">
            <LuPencilLine className="text-sm text-Positive" />
          </div>
        </Link>
        <div className="p-1 w-6 h-6 bg-Negative/20 rounded">
          <RiDeleteBin6Line
            className="text-sm text-Negative"
            onClick={handleDeleteClick}
          />
        </div>
      </div>
      {isPopupVisible && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h3 className="text-lg font-bold mb-4">Delete {item.userName}?</h3>
            <p className="mb-4">Are you sure you want to delete this agent?</p>
            <div className="flex justify-between">
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
