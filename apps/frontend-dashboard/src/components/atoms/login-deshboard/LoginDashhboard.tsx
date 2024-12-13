'use client'
// import { useAuth } from '@/context/useAuth';
// import { User } from '@/libs/types/auth/auth.type';
import { useAuth } from '@/context/useAuth';
import Image from 'next/image';
import React from 'react'
import { MdPersonOutline } from "react-icons/md";

const LoginDashhboard = () => {
  const { user } = useAuth();
  return (
    <div className='w-[100%] h-[84px] bg-BgSoftWhite rounded-xls flex justify-start items-center p-[12px] gap-[20px]'>
      <div className='w-[42px] h-[42px] text-BgSoftWhite flex items-center justify-center overflow-hidden shadow bg-Black font-[14px] rounded-full'>
        {user?.profile && user.profile.length > 0 ? (
          <Image width={100} height={100} src={user.profile[0]} objectFit='cover' alt="Profile Image" />
        ) : (
          <MdPersonOutline className='text-[16px]' />
        )}
      </div>
      <div className='flex flex-col '><p className='dm-sans-bold text-BlackSecondary'>Welcome ,{user?.userName}</p><p className='text-[14px] text-BlackSecondary dm-sans-normal'>{user?.role}</p></div>
    </div>
  )
}

export default LoginDashhboard;