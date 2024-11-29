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
        className="py-[5px] px-[25px] rounded-[5px] bg-olive-green text-white   "
        href={"/post-property"}
        // onClick={onPost}
      >
        Post
      </Link>
      <button
        className="py-[5px] px-[25px] rounded-[5px] bg-[#BCBCB3]"
        onClick={onUpdate}
        disabled={selectedProperties.length !== 1}
      >
        Update
      </button>
      <button
        className="py-[5px] px-[25px] rounded-[5px] bg-[#E5D2B0] border border-pale-gray"
        onClick={onDelete}
        disabled={selectedProperties.length === 0}
      >
        Delete
      </button>
    </div>
  );
};

export default PropertyActions;
