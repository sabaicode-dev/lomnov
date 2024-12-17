import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Search from "@/components/organisms/search/Search";
import {IoSearch} from "react-icons/io5"
import { LuFilter } from "react-icons/lu";

//=========================
interface Data {
  data_list: string;
  name_data: string;
  url: string;
  addnew: string;
  namedata: string;
  data1: string;
  data2: string;
  data3: string;
}
interface Item {
  item: Data;
}

const FormCustomerHeader = ({ item }: Item) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);

  // Toggle filter popup
  const handleFilterClick = () => {
    setIsPopupVisible((prev) => !prev);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-[100%] h-auto bg-BgSoftWhite mt-[40px] relative">
      {/* Header */}
      <div className="flex justify-between p-[20px] items-center">
        <p className="inter text-[20px] font-simple ">{item.data_list} List</p>
        <Link href={item.url}>
          <button className="bg-Primary py-[8px] px-[16px] rounded-sm text-[16px] text-BgSoftWhite">
            {item.addnew}
          </button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-Primary/10 w-[100%] flex justify-end gap-[10px] p-[10px] items-center relative">
        <Search />
        <div
          className="bg-BgSoftWhite rounded-sm w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
          onClick={handleFilterClick}
          ref={filterRef}
        >
          <LuFilter className="w-[20px] h-[18px] text-Primary" />
        </div>

        {/* Filter Popup */}
        {isPopupVisible && (
          <div
            className="absolute top-[50px] right-[10px] w-[400px] bg-BgSoftWhite rounded-lg shadow-lg p-4 z-50"
            ref={filterRef}
          >
            <p className="text-[16px] font-[600] mb-[20px]">Filters</p>
            <form className="space-y-4">
              <div>
              <label>Search customer*</label>
                <div className="flex items-center text-Black w-[100%] h-[40px] mb-4 rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20">
                  <IoSearch className="text-gray-500 w-5 h-5 mr-2 " />
                 <input
                  type="text"
                  placeholder="Customer Name/Contact"
                  className="w-[200px] h-[42px] bg-transparent outline-none text-gray-600 placeholder-gray-400"
                 />
                </div>
                <label>Name*</label>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  >
                    <option value="">Select A-Z</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Table Headers */}
      <div className="w-[100%] p-[12px] text-[14px] text-Black font-DM Sans flex justify-between ">
        <div className="flex justify-start gap-[40px] w-[20%]">
          <p>#</p>
          <p>{item.namedata} Photo & Name</p>
        </div>
        <div className="flex justify-between items-center w-[60%] ">
          <div className="w-[200px] flex justify-start">
            <p>{item.data1}</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>{item.data2}</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>{item.data3}</p>
          </div>
        </div>
        <div className="w-[10%]"></div>
      </div>
    </div>
  );
};

export default FormCustomerHeader;
