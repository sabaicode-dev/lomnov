"use client";

import React, { useState } from "react";
import Link from "next/link";
import Search from "@/components/organisms/search/Search";
import PropertyFilterPopup from "@/components/atoms/property-filter-popup/PropertyFilterPopup";
import { LuFilter } from "react-icons/lu";

//====================
interface IFromDataListProperty {
  liveSearch?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTransition?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setSelectedLocation?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedTransition?: string;
  selectedLocation?: string;
}

const FromDataListProperty = ({ liveSearch, onChange, setSelectedLocation, setSelectedTransition, selectedLocation, selectedTransition }: IFromDataListProperty) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleFilterClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="w-[100%] h-auto bg-BgSoftWhite mt-[40px] rounded-tr-lg rounded-tl-lg relative">
      <div className="flex justify-between p-[20px] items-center">
        <p className="inter text-[20px] font-simple">Properties List</p>
        <Link href={"/dashboard/add-new-property"}>
          <button className="bg-Primary py-[8px] px-[16px] rounded-sm text-[16px] text-BgSoftWhite">
            + New Property
          </button>
        </Link>
      </div>
      <div className="bg-Primary/10 w-[100%] flex justify-end gap-[10px] p-[10px] items-center relative">
        <Search liveSearch={liveSearch as string} onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} />
        <div
          className="bg-BgSoftWhite rounded-sm w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
          onClick={handleFilterClick}
        >
          <LuFilter className="w-[20px] h-[18px] text-Primary" />
        </div>

        {/* Import PropertyFilterPopup Component */}
        {isPopupVisible &&
          <PropertyFilterPopup
            onClose={handleClosePopup}
            selectedTransition={selectedTransition as string}
            setSelectedTransition={setSelectedTransition as (e: React.ChangeEvent<HTMLSelectElement>) => void}
            selectedLocation={selectedLocation as string}
            setSelectedLocation={setSelectedLocation as (e: React.ChangeEvent<HTMLSelectElement>) => void}
          />
        }
      </div>

      {/* Table Headers */}
      <div className="w-[100%] p-[12px] text-[14px] text-Black font-DM Sans flex justify-between">
        <div className="flex justify-start gap-[40px] w-[20%]">
          <p>#</p>
          <p>Properties Photo & Name</p>
        </div>
        <div className="flex justify-between items-center ml-[93px] w-[87%]">
          <div className="w-[200px] flex justify-start">
            <p>Sale/Rent</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>Categories</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>Location</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>Price</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>Status</p>
          </div>
        </div>
        <div className="w-[9%]"></div>
      </div>
    </div>
  );
};

export default FromDataListProperty;
