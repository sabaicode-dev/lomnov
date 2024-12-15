"use client";

import React, { useState } from 'react'
import UploadProfile from '@/components/molecules/upload-profile/UploadProfile';
import RoleAssignment from '@/components/molecules/role-assignment/RoleAssignment';
import StatusEdit from '@/components/molecules/status-edit/StatusEdit';
import administrator from '@/libs/const/mock/administator';
import OverviewAdmin from '@/components/molecules/overview-administrator/OverviewAdmin';


const page = () => {
  const [data, setData] = useState(administrator)


  // Assuming you want to use the first customer for this example
  const selectedAdmin = {
    create_at: data[0].create_at, // Use the 'date' from the mock data
    latest_updated: "2024-12-13", // Set a default or mock value for 'latest_updated'
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <p className="text-[30px] font-black ">Update Admin</p>
        <button className="px-4 text-[14px] py-2 bg-Negative text-BgSoftWhite rounded-lg">
          Delete
        </button>
      </div>
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <OverviewAdmin />
          <RoleAssignment/>
          <UploadProfile />
        </div>
        <div className="w-[30%]">
          <StatusEdit item={selectedAdmin} />
        </div>
      </div>
      <div className="flex justify-start w-[100%] mt-[20px] items-center gap-4">
        <button className="px-[12px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg">
          Update
        </button>
        <button className="px-[12px] text-[14px] py-[8px] bg-BgSoftWhite text-black rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default page;