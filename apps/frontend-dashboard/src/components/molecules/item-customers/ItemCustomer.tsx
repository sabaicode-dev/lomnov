"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { StaticImageData } from 'next/image';
import CardUser from '@/components/atoms/card-user/CardUser';
import CardEmail from '@/components/atoms/card-email/CardEmail';
import CardDate from '@/components/atoms/card-date/CardDate';
import { formatDate } from '@/libs/functions/formatDate';


//==================================
type ItemData = {
  id: number;
  img: string | StaticImageData; // Assuming img is a string for file paths
  name: string;
  Email: string; // Match your data's structure
  Contact: string; // Match your data's structure
  date: string;
};


interface PropType {
  item: ItemData;
  onDelete: (id: number) => void;
}

const ItemCustomer = ({ item, onDelete }: PropType) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

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
    <div className='w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] bg-BgSoftWhite/50 border-Primary/10'>
      <div className='flex justify-start items-center w-[20%] gap-[40px]'>
        <p>{item.id}</p>
        <CardUser usernname={item.name} image={item.img} />
      </div>
      <div className='flex justify-between items-center w-[60%]'>
        <CardEmail email={item.Email} />
        <div className='w-[200px] flex justify-start'><p>{item.Contact}</p></div>
        <CardDate datetime={formatDate(item.date)} />
      </div>
      <div className='flex items-center justify-between gap-[10px] w-[10%]'>
        <Link href={"/dashboard/view-customer"}>
            <div className='p-[4px] w-[24px] h-[24px]  bg-Primary/20 rounded-[6px] cursor-pointer '>
              <MdOutlineRemoveRedEye className='text-[16px] text-Primary' />
            </div>
        </Link>
        <Link href={"/dashboard/update-customer"}>
            <div className='p-[4px] w-[24px] h-[24px]  bg-Positive/20 rounded-[6px] cursor-pointer '>
              <LuPencilLine className='text-[16px] text-Positive' />
            </div>
        </Link>
        <div className='p-[4px] w-[24px] h-[24px]  bg-Negative/20 rounded-[6px] cursor-pointer '>
          <RiDeleteBin6Line className='text-[16px] text-Negative' onClick={handleDeleteClick} />
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
  )
}

export default ItemCustomer;
