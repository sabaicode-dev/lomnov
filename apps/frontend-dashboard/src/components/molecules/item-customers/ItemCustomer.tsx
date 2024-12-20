"use client";

import React from 'react'
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

  const handleDelete = () => {
    console.log("Username in handle delete:: ", item.userName);
    
    onDelete(item.userName);
  };

  return (
    <div className='w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] bg-BgSoftWhite/50 border-Primary/10'>
      <div className='flex justify-start items-center w-[20%] gap-[40px]'>
        <p>{toSubstring(item._id, 4)}</p>
        <CardUser usernname={toSubstring(item.userName,5)} image={item.profile[0]} />
      </div>
      <div className='flex justify-between items-center w-[65%]'>
        <CardEmail email={item.email} />
        <div className='w-[200px] flex justify-start'><p>{item.phoneNumber}</p></div>
        <CardDate datetime={formatDate(item.createdAt)} />
      </div>
      <div className='flex items-center justify-around gap-[10px] w-[5%]'>
        <Link href={`/dashboard/view-customer/${item.userName}`}>
          <div className='p-[4px] w-[24px] h-[24px]  bg-Primary/20 rounded-[6px] cursor-pointer '>
            <MdOutlineRemoveRedEye className='text-[16px] text-Primary' />
          </div>
        </Link>
        <button 
          className="p-[4px] w-[24px] h-[24px]  bg-Negative/20 rounded-[6px] cursor-pointer"
          onClick={handleDelete}
        >
          <RiDeleteBin6Line className='text-[16px] text-Negative' />
        </button>
      </div>
    </div>
  )
}

export default ItemCustomer;
