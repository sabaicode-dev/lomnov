'use client'
import { useAuth } from '@/context/useAuth';
import Image from 'next/image';
import React from 'react'
import { MdOutlinePersonOutline } from 'react-icons/md'
export default function ProfileImage() {
    const { user } = useAuth();
    return (
        <>
            <div className="bg-BgSoftWhite rounded-[50%] w-[240px] h-[240px] flex items-center justify-center">
                {user?.profile && user.profile.length > 0 ? (
                    <Image width={100} height={100} src={user.profile[0]} objectFit='cover' alt="Profile Image" />
                ) : (
                    <MdOutlinePersonOutline className="w-[180px] h-[180px] text-Black  " />
                )}
            </div>
            <div className="w-[58px] h-[58px] bg-Primary flex items-center justify-center rounded-full absolute mt-[200px] ml-[150px]">
                <p className="text-[33px] text-BgSoftWhite ">+</p>
            </div>
        </>
    )
}
