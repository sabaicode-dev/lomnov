"use client";
import Link from "next/link";
import React from "react";

interface PropertyActionsProps {
  selectedProperties: string[];
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
      <Link
        className="py-[5px] px-[25px] rounded-[10px] bg-green-500 hover:bg-green-500 transition-all duration-150 ease-in-out hover:scale-105 active:scale-95  "
        href={"/post-property"}
        // onClick={onPost}
      >
        Post
      </Link>
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
