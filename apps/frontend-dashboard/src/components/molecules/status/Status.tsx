"use client";

import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

interface IStatusProps {
  status: boolean; 
  createdAt: string | null; 
  updatedAt: string | null; 
}

const Status = ({ status, createdAt, updatedAt }: IStatusProps) => {
  return (
    <div className="w-[100%] mt-[40px] text-[14px]">
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">Status</h2>
        <div className="mt-4 flex items-center space-x-3">
          <div
            className={`w-10 h-6 flex items-center rounded-full p-1 ${
              status ? "bg-Primary" : "bg-gray-200"
            } transition-colors`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                status ? "translate-x-4" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {status ? "Public" : "Private"}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {status
            ? "This product is visible on all sales channels."
            : "This product will be hidden from all sales channels."}
        </p>
        <div className="mt-4">
          <div className="mt-4 flex space-x-3">
            <span className="text-sm font-medium text-gray-700">
              Created at
              <p className="mt-2 text-sm text-gray-500">
                {createdAt
                  ? formatDistanceToNow(parseISO(createdAt), { addSuffix: true })
                  : "Not available"}
              </p>
            </span>
          </div>
          <div className="mt-4 flex space-x-3">
            <span className="text-sm font-medium text-gray-700">
              Latest updated
              <p className="mt-2 text-sm text-gray-500">
                {updatedAt
                  ? formatDistanceToNow(parseISO(updatedAt), { addSuffix: true })
                  : "Not available"}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
