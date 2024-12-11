import React from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import Link from "next/link";
import { PiLockKeyLight } from "react-icons/pi";
const page = () => {
  return (
    <div>
      <p className="text-[30px] font-black ">Account Setting</p>
      <div className="w-[100%] flex justify-between  mt-[50px]">
        <div className="w-[20%]  grid gap-4 grid-cols-1">
          <div className="flex justify-start relative">
            <div className="bg-BgSoftWhite rounded-[50%] w-[240px] h-[240px] flex items-center justify-center">
              <MdOutlinePersonOutline className="w-[180px] h-[180px] text-Black  " />
            </div>
            <div className="w-[58px] h-[58px] bg-Primary flex items-center justify-center rounded-full absolute mt-[200px] ml-[150px]">
              <p className="text-[33px] text-BgSoftWhite ">+</p>
            </div>
          </div>
          <div className="mt-[20px]">
            <p className="text-Black text-[20px] font-[600]">James L. Erickson</p>
            <p className="text-Primary">erich@gmail.com</p>
            <Link href={"/account-setting/profile"}>
              <div className="w-[223px] mt-[30px] bg-none flex justify-start gap-[10px] text-Black text-[16px] items-center px-[12px] py-[5px] h-[38px] rounded-sm">
                <MdOutlinePersonOutline className="text-[20px] " />
                <p>Profile</p>
              </div>
            </Link>
            <Link href={"/account-setting/change_password"}>
              <div className="w-[223px] bg-Primary flex mt-[10px] justify-start gap-[10px] text-BgSoftWhite text-[16px] items-center px-[12px] py-[5px] h-[38px] rounded-sm ">
                <PiLockKeyLight  className="text-[20px] " />
                <p>Change Password</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-[80%]">
          <form className="w-[100%] text-Black grid gap-4 grid-cols-1">
            <div className="w-[100%]">
              <label>Current Password*</label>
              <input
                type="password"
                className="text-Black w-[100%] h-[40px] rounded-sm p-[10px] border-2  shadow-md focus:outline-none focus:border-Primary/20"
              />
            </div>
            <div className="w-[100%]">
              <label>New Password*</label>
              <input
                type="password"
                className="text-Black w-[100%] h-[40px] rounded-sm p-[10px] border-2  shadow-md focus:outline-none focus:border-Primary/20"
              />
            </div>
            <div className="w-[100%]">
              <label>Confirm Password*</label>
              <input
                type="password"
                className="text-Black w-[100%] h-[40px] rounded-sm p-[10px] border-2  shadow-md focus:outline-none focus:border-Primary/20"
              />
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
      </div>
    </div>
  );
};

export default page;
