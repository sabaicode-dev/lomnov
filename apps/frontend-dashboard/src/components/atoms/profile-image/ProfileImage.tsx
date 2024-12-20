'use client';
import Image from 'next/image';
import React from 'react';
import { MdOutlinePersonOutline } from 'react-icons/md';

export default function ProfileImage({ profile }: Readonly<{ profile: string | string[] }>) {
    return (
        <div className='relative  w-[240px] h-[240px] mx-auto'>
            <div className="bg-BgSoftWhite rounded-[50%] w-[240px] h-[240px] flex items-center justify-center overflow-hidden">
                {profile && profile.length > 0 ? (
                    <Image
                        width={240}
                        height={240}
                        src={profile[0]}
                        className="object-cover"
                        alt="Profile Image"
                    />
                ) : (
                    <MdOutlinePersonOutline className="w-[180px] h-[180px] text-Black" />
                )}
            </div>
            <label
                htmlFor="profileImageUpload"
                className="absolute bottom-4 right-4 transform translate-x-1/4 translate-y-1/4 w-[58px] h-[58px] bg-Primary flex items-center justify-center rounded-full cursor-pointer shadow-lg hover:scale-105 transition-transform"
            >
                <p className="text-[33px] text-BgSoftWhite">+</p>
            </label>
            <input
                id="profileImageUpload"
                type="file"
                className="hidden"
                accept="image/*"
            />
        </div>
    );
}
