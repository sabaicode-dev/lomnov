"use client";

import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import CardUser from "@/components/atoms/card-user/CardUser";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { toSubstring } from "@/libs/functions/toSubstring";
import { LuPencilLine } from "react-icons/lu";

// Define item structure
interface PropType {
  item: RealEstateItem;
  onDelete: (id: string) => void; // Delete handler
  onStatusChange: (id: string, newStatus: boolean) => void; // Handler for status change
}

const ItemProperty = ({ item, onDelete, onStatusChange }: PropType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete(item._id);
  };

  const handleApprove = () => {
    onStatusChange(item._id, true); // Set status to true (Public)
    setIsModalOpen(false);
  };

  const handleReject = () => {
    onStatusChange(item._id, false); // Set status to false (Private)
    setIsModalOpen(false);
  };

  // Map status to display labels
  const statusLabel = item.status ? "Public" : "Private";
  const statusClass = item.statusAdmin
    ? "text-Positive bg-Positive/20 border-Positive"
    : "text-Negative bg-Negative/20 border-Negative";

  return (
    <div className="w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] bg-BgSoftWhite/50 border-Primary/10 relative">
      <div className="flex justify-start items-center w-[20%] gap-[40px]">
        <p>{toSubstring(item._id, 4)}</p>
        <CardUser
          usernname={toSubstring(item.title[0].content, 12)}
          image={item.thumbnail}
        />
      </div>

      <div className="flex justify-between items-center w-[70%]">
        <div className="w-[200px] flex justify-start">
          {item.transition[0]?.content === "For Sale" ? (
            <p className="text-Positive px-[4px] bg-Positive/20 rounded-[4px] border-[0.3px] border-Positive">
              {item.transition[0]?.content}
            </p>
          ) : (
            <p className="text-Negative px-[4px] bg-Negative/20 rounded-[4px] border-[0.3px] border-Negative">
              {item.transition[0]?.content}
            </p>
          )}
        </div>
        <div className="w-[200px] flex justify-start">
          <p>{item.category[0]?.content}</p>
        </div>
        <div className="w-[200px] flex justify-start">
          <p>{item.location[0]?.content}</p>
        </div>
        <div className="w-[200px] flex justify-start">
          <p>{item.price}</p>
        </div>
        <div className="w-[200px] flex justify-start gap-[2px]">
          {item.statusAdmin === true ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-Positive px-[4px] bg-Positive/20 rounded-[4px] border-[0.3px] border-Positive text-[14px] flex justify-between items-center gap-[5px]"
            >
              <p>Aprove</p>
              <LuPencilLine />
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-Negative px-[4px] bg-Negative/20 rounded-[4px] border-[0.3px] border-Negative text-[14px] flex justify-between items-center gap-[5px]"
            >
              <p>Reject</p>
              <LuPencilLine />
            </button>
          )}
          <p>|</p>
          {item.status === true ? (
            <button
              className="text-Positive px-[4px] bg-Positive/20 rounded-[4px] border-[0.3px] border-Positive text-[14px] flex items-center gap-[5px]"
            >
              <p>Publish</p>
            </button>
          ) : (
            <button
              className="text-Negative px-[4px] bg-Negative/20 rounded-[4px] border-[0.3px] border-Negative text-[14px] flex justify-between items-center gap-[5px]"
            >
              <p>Private</p>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-around gap-[5px] w-[5%]">
        <Link href={`/dashboard/view-property/${item._id}`}>
          <div className="p-[4px] w-[24px] h-[24px] bg-Primary/20 rounded-[6px]">
            <MdOutlineRemoveRedEye className="text-[16px] text-Primary" />
          </div>
        </Link>
        <button
          onClick={handleDelete}
          className="p-[4px] w-[24px] h-[24px] bg-Negative/20 rounded-[6px] cursor-pointer"
        >
          <RiDeleteBin6Line className="text-[16px] text-Negative" />
        </button>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] md:w-[400px]">
            <p className="text-lg font-semibold mb-4">
              Please Confirm: Approve or Reject?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-Positive text-white rounded-md hover:bg-Positive/50"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-Negative text-white rounded-md hover:bg-Negative/50"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemProperty;
