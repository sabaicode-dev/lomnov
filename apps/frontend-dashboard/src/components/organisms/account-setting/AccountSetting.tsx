'use client'
import Input from '@/components/atoms/InputField/Input';
import ProfileImage from '@/components/atoms/profile-image/ProfileImage';
import { useAuth } from '@/context/useAuth';
import { User } from '@/libs/types/auth/auth.type';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { MdOutlinePersonOutline } from "react-icons/md";
import { PiLockKeyLight } from "react-icons/pi";

export default function AccountSetting() {
    const { user } = useAuth();
    const [users, setUsers] = useState<User | null>(null);
    const usernameAtprofile = user?.userName;

    useEffect(() => {
        if (user) {
            setUsers(user);
        }
    }, [user]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsers((prev: User | null) => {
            if (prev) {
                return {
                    ...prev,
                    [name]: value,
                };
            } else {
                return {
                    [name]: value,
                } as unknown as User;
            }
        });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (users) {
            console.log('Updated User:', users);
        }
    };

    return (
        <>
            <div className="w-full md:w-[20%] grid gap-4 grid-cols-1">
                <div className="flex justify-center md:justify-start relative">
                    <ProfileImage />
                </div>
                <div className="mt-[20px] text-center md:text-left">
                    <p className="text-Black text-[20px] font-[600]">{usernameAtprofile}</p>
                    <p className="text-Primary">{users?.email}</p>
                    <div className="flex flex-col items-center md:items-start mt-5">
                        <Link href="/dashboard/account-setting/profile">
                            <div className="w-full md:w-[223px] mt-[30px] bg-Primary flex justify-center md:justify-start gap-[10px] text-BgSoftWhite text-[16px] items-center px-[12px] py-[5px] h-[38px] rounded-sm">
                                <MdOutlinePersonOutline className="text-[20px]" />
                                <p>Profile</p>
                            </div>
                        </Link>
                        <Link href="/dashboard/account-setting/change-password">
                            <div className="w-full md:w-[223px] bg-none flex mt-[10px] justify-center md:justify-start gap-[10px] text-Black text-[16px] items-center px-[12px] py-[5px] h-[38px] rounded-sm">
                                <PiLockKeyLight className="text-[20px]" />
                                <p>Change Password</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-[80%]">
                <form onSubmit={handleFormSubmit} className="w-full text-Black">
                    <div className="w-full">
                        <Input
                            htmlFor="username"
                            id="username"
                            placeholder="username"
                            title="Username*"
                            name="userName"
                            values={users?.userName ?? ''}
                            errorMsg={true}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 mt-[20px]">
                        <div className="w-full">
                            <Input
                                htmlFor="firstname"
                                id="firstname"
                                placeholder="firstname"
                                title="FirstName"
                                name="firstName"
                                values={users?.firstName ?? ''}
                                errorMsg={true}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                htmlFor="lastname"
                                id="lastname"
                                placeholder="last name"
                                title="LastName"
                                name="lastName"
                                values={users?.lastName ?? ''}
                                errorMsg={true}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full mt-5 md:mt-0">
                            <Input
                                htmlFor="email"
                                id="email"
                                placeholder="email"
                                title="Email"
                                name="email"
                                values={users?.email ?? ''}
                                errorMsg={true}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full mt-5 md:mt-0">
                            <Input
                                htmlFor="contact"
                                id="contact"
                                placeholder="phone number"
                                title="Contact"
                                name="phoneNumber"
                                values={users?.phoneNumber ?? ''}
                                errorMsg={true}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end gap-[8px] mt-[34px]">
                        <button type="button" className="px-[16px] py-[8px] rounded-sm bg-BgSoftWhite border-2 border-BgSoftWhite text-[16px] text-black font-Inter">
                            Cancel
                        </button>
                        <button type="submit" className="font-Inter px-[16px] py-[8px] rounded-sm bg-Primary border-2 text-[16px] border-Primary text-BgSoftWhite">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
