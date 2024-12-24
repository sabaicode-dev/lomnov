import React from "react";
import OverviewProperty from "@/components/molecules/overview_property/OverviewProperty";
import AddressMap from "@/components/molecules/address-map/AddressMap";
import Status from "@/components/molecules/status/Status";
const page = () => {
  return (
    <div>
      <p className="text-[30px] font-black ">Update Property</p>
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <OverviewProperty />
          <AddressMap />
        </div>
        <div className="w-[30%]">
          <Status />
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
  );
};

export default page;
