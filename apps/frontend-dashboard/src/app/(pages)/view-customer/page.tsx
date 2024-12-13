import React from 'react'
import Photo_Attachment from "@/components/molecules/photo_Attachment/Photo_Attachment";
import Status from "@/components/molecules/status/Status";
import GeneralInfo from "@/components/molecules/general_info/GeneralInfo";

const page = () => {
  return (
    <div className="">
    <p className="text-[30px] font-black ">Customer</p>
    <div className="w-[100%] flex justify-between gap-[20px]">
      <div className="w-[70%]">
        <GeneralInfo />
        <Photo_Attachment />
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