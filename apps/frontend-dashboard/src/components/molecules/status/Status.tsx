"use client";
import React, { ChangeEvent } from "react";

interface IStatusProps {
  name: string;
  isChecked?: boolean;
  values?: string | number | readonly string[] | undefined;
  onChecked?: (e: ChangeEvent<HTMLInputElement>) => void;

}
const Status = ({ name, isChecked, values, onChecked }: IStatusProps) => {
  return (
    <div className="w-[100%] mt-[40px] text-[14px]">
      <div className=" p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">Status</h2>
        <div className="mt-4 flex items-center space-x-3">
          <button
            type="button"
            onClick={() => {
              if (onChecked) {
                onChecked({ target: { checked: !isChecked } } as ChangeEvent<HTMLInputElement>);
              }
            }}
            className={`w-10 h-6 flex items-center rounded-full p-1 ${isChecked ? "bg-Primary" : "bg-gray-200"
              } transition-colors`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${isChecked ? "translate-x-4" : "translate-x-0"
                }`}
            ></div>
          </button>

          <span className="text-sm font-medium text-gray-700">
            {isChecked ? "Public" : "Private"}
          </span>
          <input
            type="checkbox"
            name={name}
            checked={isChecked} // Bind the checkbox to the state
            onChange={onChecked} // Update state when the checkbox is clicked
            className="sr-only peer"
            value={values}
          />
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
