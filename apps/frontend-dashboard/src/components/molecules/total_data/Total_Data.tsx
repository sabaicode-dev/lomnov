import React from 'react'
import Image from 'next/image';
import test from '@/icons/image.png';
import { IoArrowUpSharp } from "react-icons/io5";

const Total_Data = () => {
  return (
    <div className='w-[100%] h-[110px] bg-BgSoftWhite rounded-xls p-[24px] mt-[40px] flex justify-between items-center'>
        <div>
            <div className='flex justify-start  items-end gap-[9px]'>
                <p className='text-[28px] font-normal text-Black'>2,345</p>
                <div className='flex justify-start bg-[#DEF3E6] text-Positive rounded-[4px] py-[2px] px-[4px] items-center text-[12px] w-[51px] h-[19px] mb-[5px]'> <IoArrowUpSharp/> <p>1.12%</p></div>
            </div>
            <p>No. of properties</p>
        </div>
        <div><Image alt='img' src={test} width={56} height={56}></Image></div>
    </div>
  )
}

export default Total_Data;