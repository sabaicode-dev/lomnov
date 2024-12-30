"use client";

import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { CustomerResponseType } from "@/libs/types/api-customers/customer-response";

//==================================
interface StatusProp {
  item: CustomerResponseType;
};


const StatusEdit = ({ item }: StatusProp) => {
  console.log("status item:: ", item);

  return (
    <div className="w-[100%] mt-[40px] text-[14px]">
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">Overview</h2>
        <div className="mt-4">
          <div className="mt-4 flex space-x-3">
            <span className="text-sm font-medium text-gray-700">
              Created at
              <p className="mt-2 text-sm text-gray-500">
                {item.createdAt
                  ? formatDistanceToNow(parseISO(item.createdAt), { addSuffix: true })
                  : "Not available"}
              </p>
            </span>
          </div>
          <div className="mt-4 flex space-x-3">
            <span className="text-sm font-medium text-gray-700">
              Latest updated
              <p className="mt-2 text-sm text-gray-500">
                {item.updatedAt
                  ? formatDistanceToNow(parseISO(item.updatedAt), { addSuffix: true })
                  : "Not available"}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusEdit;
