import React from 'react'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { StaticImageData } from 'next/image';
import CardUser from '@/components/atoms/card-user/CardUser';
import CardEmail from '@/components/atoms/card-email/CardEmail';
import CardStatus from '@/components/atoms/card-status/CardStatus';
import CardUserRole from '@/components/atoms/card-user-role/CardUserRole';
import CardDate from '@/components/atoms/card-date/CardDate';


//==================================
type ItemData = {
  id: number;
  img: string | StaticImageData; // Assuming img is a string for file paths
  email: string;
  name: string;
  status: string;
  role: string; // Match your data's structure
  create_at: string;
};


interface PropType {
  item: ItemData;
}

const ItemAdminstrator = ({ item }: PropType) => {
  return (
    <div className='w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] bg-BgSoftWhite/50 border-Primary/10'>
      <div className='flex justify-start items-center w-[20%] gap-[40px]'>
        <p>{item.id}</p>
        <CardUser usernname={item.name} image={item.img} />
      </div>
      <div className='flex justify-between items-center w-[60%]'>
        <CardEmail email={item.email} />
        <CardStatus status={item.status} />
        <CardUserRole role={item.role} />
        <CardDate datetime={item.create_at} />
      </div>
      <div className='flex items-center justify-between gap-[10px] w-[10%]'>
        <div className='p-[4px] w-[24px] h-[24px]  bg-Primary/20 rounded-[6px]'>
          <MdOutlineRemoveRedEye className='text-[16px] text-Primary' />
        </div>
        <div className='p-[4px] w-[24px] h-[24px]  bg-Positive/20 rounded-[6px]'>
          <LuPencilLine className='text-[16px] text-Positive' />
        </div>
        <div className='p-[4px] w-[24px] h-[24px]  bg-Negative/20 rounded-[6px]'>
          <RiDeleteBin6Line className='text-[16px] text-Negative' />
        </div>
      </div>
    </div>
  )
}

export default ItemAdminstrator;


