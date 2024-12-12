"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";

// Define item structure
interface ItemData {
  id: number;
  img: string | StaticImageData;
  name: string;
  sale: string;
  category: string;
  location: string;
  price: number;
}

interface PropType {
  item: ItemData;
  onDelete: (id: number) => void;
}

const ItemProperty = ({ item, onDelete }: PropType) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Handle popup visibility
  const handleDeleteClick = () => {
    setIsPopupVisible(true);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleConfirmDelete = () => {
    onDelete(item.id); // Call the onDelete callback
    setIsPopupVisible(false);
  };

  return (
    <div className="w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] bg-BgSoftWhite/50 border-Primary/10 relative">
      <div className="flex justify-start items-center w-[20%] gap-[40px]">
        <p>{item.id}</p>
        <div className="flex justify-start gap-[20px]">
          <Image src={item.img} alt="img" width={32} height={32}></Image>
          <p>{item.name}</p>
        </div>
      </div>
      <div className="flex justify-between items-center w-[60%]">
        <div className="w-[200px] flex justify-start">
          <p className="text-Positive px-[4px] bg-Positive/20 rounded-[4px] border-[0.3px] border-Positive">
            {item.sale}
          </p>
        </div>
        <div className="w-[200px] flex justify-start">
          <p>{item.category}</p>
        </div>
        <div className="w-[200px] flex justify-start">
          <p>{item.location}</p>
        </div>
        <div className="w-[200px] flex justify-start">
          <p>{item.price}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-[10px] w-[10%]">
        <Link href={"/view-property"}>
          <div className="p-[4px] w-[24px] h-[24px] bg-Primary/20 rounded-[6px]">
            <MdOutlineRemoveRedEye className="text-[16px] text-Primary" />
          </div>
        </Link>
        <Link href={"/update-property"}>
          <div className="p-[4px] w-[24px] h-[24px] bg-Positive/20 rounded-[6px]">
            <LuPencilLine className="text-[16px] text-Positive" />
          </div>
        </Link>
        <div
          className="p-[4px] w-[24px] h-[24px] bg-Negative/20 rounded-[6px] cursor-pointer"
          onClick={handleDeleteClick}
        >
          <RiDeleteBin6Line className="text-[16px] text-Negative" />
        </div>
      </div>

      {isPopupVisible && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h3 className="text-lg font-bold mb-4">Delete {item.name}?</h3>
            <p className="mb-4">Are you sure you would like to do this?</p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemProperty;
