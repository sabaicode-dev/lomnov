"use client";

import React from "react";

interface IStatusProps {
  name: string;
  isChecked: boolean;
  onChecked: (name: string, checked: boolean) => void;
}

const Status = ({ name, isChecked, onChecked }: IStatusProps) => {
  const handleToggle = () => {
      const newChecked = !isChecked;
      onChecked(name, newChecked); // Notify parent of the new state
  };

  return (
      <div className="w-[100%] mt-[40px] text-[14px]">
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-800">Status</h2>
              <div
                  className="mt-4 flex items-center space-x-3 cursor-pointer"
                  onClick={handleToggle} // Trigger toggle on click
              >
                  <div
                      className={`w-10 h-6 flex items-center rounded-full p-1 ${
                          isChecked ? "bg-Primary" : "bg-gray-200"
                      } transition-colors`}
                  >
                      <div
                          className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                              isChecked ? "translate-x-4" : "translate-x-0"
                          }`}
                      ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                      {isChecked ? "Public" : "Private"}
                  </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                  {isChecked
                      ? "This product is visible on all sales channels."
                      : "This product will be hidden from all sales channels."}
              </p>
          </div>
      </div>
  );
};

export default Status;
