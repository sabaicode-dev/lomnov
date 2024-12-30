'use client';

import React from "react";

interface UserDeletePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  userName?: string | null;
}

const UserDeletePopup: React.FC<UserDeletePopupProps> = ({
  isOpen,
  onClose,
  onDelete,
  userName,
}) => {
    console.log("Username:: ", userName);
    
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to delete "{userName}"?</h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
  );
};

export default UserDeletePopup;
