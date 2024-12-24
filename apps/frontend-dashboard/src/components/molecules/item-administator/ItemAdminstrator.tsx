
import React from 'react';
import Link from 'next/link';
import { MdOutlineRemoveRedEye } from "react-icons/md";

import CardUser from '@/components/atoms/card-user/CardUser';
import CardEmail from '@/components/atoms/card-email/CardEmail';
import CardStatus from '@/components/atoms/card-status/CardStatus';
import CardUserRole from '@/components/atoms/card-user-role/CardUserRole';
import CardDate from '@/components/atoms/card-date/CardDate';
import { formatDate } from '@/libs/functions/formatDate';
import { toSubstring } from "@/libs/functions/toSubstring";
import { CustomerResponseType } from "@/libs/types/api-customers/customer-response";
//==================================


interface PropType {
  item: CustomerResponseType;
}

const ItemAdminstrator = ({ item }: PropType) => {

  return (
    <div className='w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] bg-BgSoftWhite/50 border-Primary/10'>
      <div className='flex justify-start items-center w-[20%] gap-[40px]'>
        <p>{toSubstring(item._id, 4)}</p>
        <CardUser usernname={item.userName} image={item.profile[0]} />
      </div>
      <div className='flex justify-between items-center w-[65%]'>
        <CardEmail email={toSubstring( item.email , 12)} />
        <CardStatus status={item.status} />
        <CardUserRole role={item.role} />
        <CardDate datetime={formatDate(item.createdAt)} />
      </div>
      <div className='flex items-center justify-around gap-[10px] w-[10%]'>
        <Link href={`/dashboard/view-administrator/${item.userName}`}>
          <div className="p-1 w-8 h-8 bg-Primary/20 rounded cursor-pointer hover:bg-Primary/40 transition duration-200 flex items-center justify-center">
            <MdOutlineRemoveRedEye className="text-lg text-Primary hover:text-PrimaryDark transition duration-200"/>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ItemAdminstrator;


