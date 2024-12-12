import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagenation = () => {
  return (
    <div className="w-[100%] flex justify-between h-[67px] p-[10px] bg-BgSoftWhite/50">
      <div className="flex items-center text-Black font-medium">
        <p>Showing 1 to 3 of 3 results</p>
      </div>
      <div className="flex items-center justify-between gap-[10px]">
        <button className="bg-BgSoftWhite px-[10px] py-[8px] flex justify-between items-center gap-[10px] rounded-sm font-medium">
          10 <IoIosArrowDown className="font-medium" />
        </button>
        <p className="font-medium">per page</p>
      </div>
      <div className="flex justify-between gap-0 items-center cursor-pointer">
        <button className="px-[16px] py-[8px] bg-Primary text-BgSoftWhite rounded-sm">
          1
        </button>
        <div className="bg-BgSoftWhite px-[16px] py-[11px] rounded-r-sm ">
             <IoIosArrowForward className='text-Primary text-[18px]'/>
        </div>
      </div>
    </div>
  );
};

export default Pagenation;
