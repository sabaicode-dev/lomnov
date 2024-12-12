import React from "react";
import { TbPhoto } from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { FiItalic } from "react-icons/fi";
import { FiUnderline } from "react-icons/fi";
import { FaStrikethrough } from "react-icons/fa6";
import { FiBold } from "react-icons/fi";
<<<<<<<< HEAD:apps/frontend-dashboard/src/components/molecules/general_info/GeneralInfo.tsx
const GeneralInfo = () => {
========
const OverviewAgent = () => {
>>>>>>>> d5a5588893ae4433e32c784e94825b0e734e9b2a:apps/frontend-dashboard/src/components/molecules/over-view-agents/OverviewAgent.tsx
  return (
    <div className="w-[100%] mt-[40px] p-[24px] bg-[#F3F4F6] rounded-xls">
           <p className="text-[20px] font-[600] mb-[20px]">General Info</p>
      <form className="w-[100%] text-Black">
 
        <div className="w-[100%]">
          <label>Username*</label>
          <input
            type="text"
            placeholder="username"
            className="text-Black w-[100%] h-[40px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px] rounded-xls p-[10px]  focus:outline-none focus:border-Primary/20"
          />
        </div>
        <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px]">
          <div className="w-[100%] block">
            <label>FirstName</label>
            <input
              type="text"
              placeholder="firstname"
              className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
            />
          </div>
          <div className="w-[100%] block">
            <label>LastName</label>
            <input
              type="text"
              placeholder="lastname"
              className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
            />
          </div>
          <div className="w-[100%] mt-[5px]">
            <label>Email</label>
            <input
              type="email"
              placeholder="email"
              className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px] focus:outline-none focus:border-Primary/20"
            />
          </div>
          <div className="w-[100%] mt-[5px]">
            <label>Contact</label>
            <input
              type="number"
              placeholder="phonenumber"
              className="text-Black w-[100%] h-[40px] rounded-xls p-[10px]  bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
            />
          </div>
        </div>
      </form>
      <div className="w-[100%]  mt-[20px]">
        <label className="block  font-medium text-Black mb-[4px]">
          Description
        </label>
        <div className="border rounded-xls border-gray-300 shadow-sm w-[100%]">
          <div className="flex items-center space-x-4 p-2 bg-gray-100 border-b border-gray-300">
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <FiBold />
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <FaStrikethrough />
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <FiUnderline />
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <FiItalic />
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <FaLink />
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <MdFormatListBulleted />
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <TbPhoto />
            </button>
          </div>
          <textarea
        
            placeholder="Type your description here..."
            className="w-full h-[150px] p-2 border-0 outline-none bg-BgSoftWhite rounded-xls focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
};

<<<<<<<< HEAD:apps/frontend-dashboard/src/components/molecules/general_info/GeneralInfo.tsx
export default GeneralInfo;
========
export default OverviewAgent;
>>>>>>>> d5a5588893ae4433e32c784e94825b0e734e9b2a:apps/frontend-dashboard/src/components/molecules/over-view-agents/OverviewAgent.tsx
