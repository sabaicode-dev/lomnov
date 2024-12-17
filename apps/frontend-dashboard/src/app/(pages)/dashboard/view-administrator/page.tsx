import React from 'react'
import UploadProfile from '@/components/molecules/upload-profile/UploadProfile';
import Status from "@/components/molecules/status/Status";
import OverviewAdmin from '@/components/molecules/overview-administrator/OverviewAdmin';
import RoleAssignment from '@/components/molecules/role-assignment/RoleAssignment';

const page = () => {
  return (
    <div className="">
    <p className="text-[30px] font-black ">Administrator</p>
    <div className="w-[100%] flex justify-between gap-[20px]">
      <div className="w-[70%]">
        <OverviewAdmin />
        <RoleAssignment />
        <UploadProfile />
      </div>
      <div className="w-[30%]">
        <Status />
      </div>
    </div>
    <div className="flex justify-start w-[100%] mt-[20px] items-center gap-[4px]">
      <button className="px-[12px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg">
        Back
      </button>
     
    </div>
  </div>
  )
}

export default page;