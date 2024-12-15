"use client";

import React, { useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

//==================================
type ItemData = {
    create_at: string;
    latest_updated: string;
  };

interface PropType{
    item: ItemData;
}

const StatusEdit = ({ item }: PropType) => {
    const [isPublic, setIsPublic] = useState(false);

    const toggleStatus = () => {
        setIsPublic(!isPublic);
      };
  return (
    <div className="w-[100%] mt-[40px] text-[14px]">
      <div className=" p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">Overview</h2>
        <div className="mt-4 flex items-center space-x-3">
          <button
            onClick={toggleStatus}
            className={`w-10 h-6 flex items-center rounded-full p-1 ${
              isPublic ? "bg-Primary" : "bg-gray-200"
            } transition-colors`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                isPublic ? "translate-x-4" : "translate-x-0"
              }`}
            ></div>
          </button>
          <span className="text-sm font-medium text-gray-700">
            {isPublic ? "Public" : "Private"}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {isPublic
            ? "This product is visible on all sales channels."
            : "This product will be hidden from all sales channels."}
        </p>
        <div className="mt-4">
            <div className="mt-4 flex space-x-3">
                <span className="text-sm font-medium text-gray-700">
                    Created at
                <p className="mt-2 text-sm text-gray-500">
                 {formatDistanceToNow(parseISO(item.create_at), { addSuffix: true })}
                </p>
                </span>
            </div>
            <div className="mt-4 flex space-x-3">
                <span className="text-sm font-medium text-gray-700">
                    Latest updated
                <p className="mt-2 text-sm text-gray-500">
                {formatDistanceToNow(parseISO(item.latest_updated), {
                addSuffix: true,
              })}
                </p>
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StatusEdit;
