'use client'
import ProfileImage from '@/components/atoms/profile-image/ProfileImage'
import { useAuth } from '@/context/useAuth';
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { MdOutlinePersonOutline } from "react-icons/md";
import { PiLockKeyLight } from "react-icons/pi";

export default function AccountSetting() {
    const {user} = useAuth();
    const [users,setUser] = useState<string>(user as any)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    }
    return (
        <>
            <div className="w-[20%]  grid gap-4 grid-cols-1">
                <div className="flex justify-start relative">
                    <ProfileImage />
                </div>
                <div className="mt-[20px]">
                    <p className="text-Black text-[20px] font-[600]">{user?.userName}</p>
                    <p className="text-Primary">{user?.email}</p>
                    <Link href={"/dashboard/account-setting/profile"}>
                        <div className="w-[223px] mt-[30px] bg-Primary flex justify-start gap-[10px] text-BgSoftWhite text-[16px] items-center px-[12px] py-[5px] h-[38px] rounded-sm">
                            <MdOutlinePersonOutline className="text-[20px] " />
                            <p>Profile</p>
                        </div>
                    </Link>
                    <Link href={"/dashboard/account-setting/change-password"}>
                        <div className="w-[223px] bg-none flex mt-[10px] justify-start gap-[10px] text-Black text-[16px] items-center px-[12px] py-[5px] h-[38px] rounded-sm">
                            <PiLockKeyLight className="text-[20px] " />
                            <p>Change Password</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="w-[80%]">
                <form className="w-[100%] text-Black">
                    <div className="w-[100%]">
                        <label>Username*</label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleInputChange}
                            placeholder="username"
                            className="text-Black w-[100%] h-[40px] rounded-sm p-[10px] border-2 focus:outline-none focus:border-Primary/20"
                        />
                    </div>
                    <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px]">
                        <div className="w-[100%] block">
                            <label>FirstName</label>
                            <input
                                type="text"
                                placeholder="firstname"
                                className="text-Black w-[100%] h-[40px] rounded-sm p-[10px] border-2 focus:outline-none focus:border-Primary/20"
                            />
                        </div>
                        <div className="w-[100%] block">
                            <label>LastName</label>
                            <input
                                type="text"
                                placeholder="lastname"
                                className="text-Black w-[100%] h-[40px] rounded-sm p-[10px] border-2 focus:outline-none focus:border-Primary/20"
                            />
                        </div>
                        <div className="w-[100%] mt-[5px]">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="email"
                                className="text-Black w-[100%] h-[40px] rounded-sm p-[10px] border-2 focus:outline-none focus:border-Primary/20"
                            />
                        </div>
                        <div className="w-[100%] mt-[5px]">
                            <label>Contact</label>
                            <input
                                type="number"
                                placeholder="phonenumber"
                                className="text-Black w-[100%] h-[40px] rounded-sm p-[10px] border-2 focus:outline-none focus:border-Primary/20"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-[8px] mt-[34px]">
                        <button className="px-[16px] py-[8px] rounded-sm bg-BgSoftWhite border-2 border-BgSoftWhite text-[16px] text-black">
                            Cancel
                        </button>
                        <button className="px-[16px] py-[8px] rounded-sm bg-Primary border-2 text-[16px] border-Primary text-BgSoftWhite">
                            Save
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}
