"use client";

import React, { useState } from 'react'
import PhotoAttachment from "@/components/molecules/photo-attachment/PhotoAttachment";
import StatusEdit from '@/components/molecules/status-edit/StatusEdit';
import customer from '@/libs/const/mock/customer';
import OverviewCustomer from "@/components/molecules/overview-customer/OverviewCustomer"


const page = () => {
  const [data, setData] = useState(customer)


  // Assuming you want to use the first customer for this example
  const selectedCustomer = {
    create_at: data[0].date, // Use the 'date' from the mock data
    latest_updated: "2024-12-13", // Set a default or mock value for 'latest_updated'
  };

  return (
    <div className="">
      <p className="text-[30px] font-black ">Update Customer</p>
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <OverviewCustomer />
          <PhotoAttachment />
        </div>
        <div className="w-[30%]">
          <StatusEdit item={selectedCustomer} />
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