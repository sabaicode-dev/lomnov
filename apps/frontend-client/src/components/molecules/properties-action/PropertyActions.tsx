"use client";
import React from "react";

interface PropertyActionsProps {
  selectedProperties: number[];
  onPost: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

const PropertyActions: React.FC<PropertyActionsProps> = ({
  selectedProperties,
  onPost,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex justify-end space-x-[10px] items-center font-helvetica text-helvetica-paragraph text-charcoal font-bold">
      <button
        className="py-[5px] px-[25px] rounded-[8px] bg-neutral"
        onClick={onPost}
      >
        Post
      </button>
      <button
        className="py-[5px] px-[25px] rounded-[8px] bg-neutral"
        onClick={onUpdate}
        disabled={selectedProperties.length !== 1}
      >
        Update
      </button>
      <button
        className="py-[5px] px-[25px] rounded-[8px] bg-beige border border-pale-gray"
        onClick={onDelete}
        disabled={selectedProperties.length === 0}
      >
        Delete
      </button>
    </div>
  );
};

export default PropertyActions;
