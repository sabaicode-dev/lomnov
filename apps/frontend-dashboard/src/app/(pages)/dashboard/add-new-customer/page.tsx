import React from "react";
import PhotoAttachment from "@/components/molecules/photo-attachment/PhotoAttachment";
import Status from "@/components/molecules/status/Status";
import GeneralInfo from "@/components/molecules/general_info/GeneralInfo";

const page = () => {
  return (
    <div className="">
      <p className="text-[30px] font-black ">New Customer</p>
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <GeneralInfo />
          <PhotoAttachment />
        </div>
        <div className="w-[30%]">
          <Status />
        </div>
      </div>
      <div className="flex justify-start w-[100%] mt-[20px] items-center gap-4">
        <button className="px-[12px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg">
          Create
        </button>
        <button className="px-[12px] text-[14px] py-[8px] bg-BgSoftWhite text-black rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default page;