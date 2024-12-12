"use client";
import React from "react";
import { useState } from "react";
import { TbPhoto } from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { FiItalic } from "react-icons/fi";
import { FiUnderline } from "react-icons/fi";
import { FaStrikethrough } from "react-icons/fa6";
import { FiBold } from "react-icons/fi";

import Photo_Attachment from "../photo_Attachment/Photo_Attachment";
import Status from "../status/Status";
//=============================================
const Overview_property = () => {
 
  const [selectedRole, setSelectedRole] = useState("");




  return (
    <div>
      {/*Over view*/}
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <div className="w-[100%] mt-[40px] p-[24px] bg-[#F3F4F6] rounded-xls">
            <p className="text-[20px] font-[600]">Overview</p>
            <form className="w-[100%] text-Black">
              <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px]">
                <div className="w-[100%] block">
                  <label>Property Title*</label>
                  <input
                    type="text"
                    placeholder="Property title"
                    className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] text-[14px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  />
                </div>

                <div className="w-[100%] mt-[5px] text-[14px]">
                  <label>Slug*</label>
                  <input
                    type="text"
                    placeholder="Property Slug"
                    className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] text-[14px]  bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  />
                </div>
              </div>
              <div className="w-[100%]  mt-[20px] text-[14px]">
                <label className="block  font-medium text-Black mb-[4px] text-[14px]">
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
                    className="w-full h-[150px] p-2 border-0 outline-none text-[14px] bg-BgSoftWhite rounded-xls focus:ring-0"
                  />
                </div>
              </div>
              <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px] text-[14px]">
                <div className="w-[100%] block">
                  <label>Category*</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  >
                    <option value="home">Home</option>
                    <option value="villa">Villa</option>
                    <option value="land">Land</option>
                    <option value="shop">Shop</option>
                  </select>
                </div>

                <div className="w-[100%] block text-[14px]">
                  <label>Transition*</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  >
                    <option value="For Buy">Buy</option>
                    <option value="For Rent">Rent</option>
                  </select>
                </div>
              </div>
              <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px] text-[14px]">
                <div className="w-[100%] block">
                  <label>Price*</label>
                  <input
                    type="number"
                    placeholder="Your price"
                    className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  />
                </div>

                <div className="w-[100%] block text-[14px]">
                  <label>Location*</label>
                  <select
                    name="role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  >
                    <option value="phnom penh">Phnom Penh</option>
                    <option value="kom pongcham">Kom PongCham</option>
                    <option value="Svay Reng">Svay Reng</option>
                    <option value="kep">Kep</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          {/*List Detail*/}
          <div className="w-[100%] mt-[20px]">
            <div className="w-[100%] mt-[20px] p-[24px] bg-[#F3F4F6] rounded-xls">
              <p className="text-[20px] font-[600]">List Detail</p>
              <form className="w-[100%] mt-[20px] text-[14px]">
                <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px]">
                  <div className="w-[100%] block">
                    <label>Bedrooms</label>
                    <input
                      type="number"
                      placeholder="Bedrooms"
                      className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                    />
                  </div>
                  <div className="w-[100%] block">
                    <label>Bathrooms</label>
                    <input
                      type="number"
                      placeholder="Bathrooms"
                      className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                    />
                  </div>
                  <div className="w-[100%] mt-[5px]">
                    <label>Spacious life (m2)</label>
                    <input
                      type="number"
                      placeholder="Spacious life"
                      className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px] focus:outline-none focus:border-Primary/20"
                    />
                  </div>
                  <div className="w-[100%] mt-[5px]">
                    <label>Parking available</label>
                    <input
                      type="number"
                      placeholder="Parking available"
                      className="text-Black w-[100%] h-[40px] rounded-xls p-[10px]  bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/*Up load image*/}
          <Photo_Attachment/>
        </div>

        {/*status*/}
       <Status/>
      </div>
    </div>
  );
};

export default Overview_property;
