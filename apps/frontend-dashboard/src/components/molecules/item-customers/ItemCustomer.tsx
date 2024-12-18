"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CustomerResponseType } from '@/libs/types/api-customers/customer-response';
import CardUser from '@/components/atoms/card-user/CardUser';
import CardEmail from '@/components/atoms/card-email/CardEmail';
import CardDate from '@/components/atoms/card-date/CardDate';
import { formatDate } from '@/libs/functions/formatDate';
import { toSubstring } from '@/libs/functions/toSubstring';

//==================================
interface PropType {
  item: CustomerResponseType;
  onDelete: (id: string) => void;
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
    onDelete(item._id);
    setIsPopupVisible(false);
  };

  return (
    <div className='w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] bg-BgSoftWhite/50 border-Primary/10'>
      <div className='flex justify-start items-center w-[20%] gap-[40px]'>
        <p>{toSubstring(item._id, 4)}</p>
        <CardUser usernname={item.userName} image={item.profile[0]} />
      </div>
      <div className='flex justify-between items-center w-[65%]'>
        <CardEmail email={item.email} />
        <div className='w-[200px] flex justify-start'><p>{item.phoneNumber}</p></div>
        <CardDate datetime={formatDate(item.createdAt)} />
      </div>
      <div className='flex items-center justify-around gap-[10px] w-[5%]'>
        <Link href={`/dashboard/view-customer/${item._id}`}>
          <div className='p-[4px] w-[24px] h-[24px]  bg-Primary/20 rounded-[6px] cursor-pointer '>
            <MdOutlineRemoveRedEye className='text-[16px] text-Primary' />
          </div>
        </Link>
        <div className='p-[4px] w-[24px] h-[24px]  bg-Negative/20 rounded-[6px] cursor-pointer '>
          <RiDeleteBin6Line className='text-[16px] text-Negative' onClick={handleDeleteClick} />
        </div>
      </div>
      {isPopupVisible && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">Delete {item.userName}?</h3>
            <p className="mb-4">Are you sure you would like to do this?</p>
            <div className="flex justify-center gap-4">
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
