import React from "react";
import Link from "next/link";
import Search from "@/components/organisms/search/Search";
import { LuFilter } from "react-icons/lu";
const FromDataListProperty = () => {
  return (
    <div className="w-[100%] h-auto bg-BgSoftWhite mt-[40px] rounded-lg">
      <div className="flex justify-between p-[20px] items-center">
        <p className="inter text-[20px] font-simple ">Property List</p>
        <Link href={"/dashboard/add-new-property"}>
          <button className="bg-Primary py-[8px] px-[16px] rounded-sm text-[16px] text-BgSoftWhite">
            +New Property
          </button>
        </Link>
      </div>
      <div className="bg-Primary/10 w-[100%] flex justify-end gap-[10px] p-[10px] items-center">
        <Search />
        <div className="bg-BgSoftWhite rounded-sm w-[40px] h-[40px] flex items-center justify-center">
          {" "}
          <LuFilter className="w-[20px] h-[18px] text-Primary" />
        </div>
      </div>
      <div className="w-[100%] p-[12px] text-[14px] text-Black font-DM Sans flex justify-between ">
        <div className="flex justify-start gap-[40px] w-[20%]">
          <p>#</p>
          <p>Properties Photo & Name</p>
        </div>
        <div className="flex justify-between items-center  w-[60%] ">
          <div className="w-[200px] flex justify-start">
            {" "}
            <p>Sale/Rent</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>Categories</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>Location</p>
          </div>
          <div className="w-[200px] flex justify-start">
            {" "}
            <p>Price</p>
          </div>
        </div>
        <div className="w-[10%]"></div>
      </div>
    </div>
  );
};

export default FromDataListProperty;
