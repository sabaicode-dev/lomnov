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

const FromDataListProperty = ({
  liveSearch,
  onChange,
  setSelectedLocation,
  setSelectedTransition,
  selectedLocation,
  selectedTransition,
}: IFromDataListProperty) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleFilterClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="w-full h-auto bg-BgSoftWhite mt-10 rounded-tr-lg rounded-tl-lg">
      <div className="flex justify-between items-center p-5">
        <p className="text-lg font-semibold">Properties List</p>
        <Link href="/dashboard/add-new-property">
          <button className="bg-Primary text-white py-2 px-4 rounded hover:bg-PrimaryDark">
            + New Property
          </button>
        </Link>
      </div>
      <div className="bg-Primary/10 w-full flex justify-end gap-3 items-center p-3 relative">
        <Search
          liveSearch={liveSearch as string}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
        />
        <div
          className="bg-white rounded shadow w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100"
          onClick={handleFilterClick}
        >
          <LuFilter className="text-Primary w-5 h-5" />
        </div>
        {isPopupVisible && (
          <PropertyFilterPopup
            onClose={handleClosePopup}
            selectedTransition={selectedTransition as string}
            setSelectedTransition={setSelectedTransition as (e: React.ChangeEvent<HTMLSelectElement>) => void}
            selectedLocation={selectedLocation as string}
            setSelectedLocation={setSelectedLocation as (e: React.ChangeEvent<HTMLSelectElement>) => void}
          />
        )}
      </div>
      <div className="w-full px-4 py-3 bg-gray-100 text-sm font-medium text-gray-700 flex items-center">
        <div className="flex justify-start w-[20%] gap-6">
          <p>#</p>
          <p>Properties Photo & Name</p>
        </div>
        <div className="flex justify-between w-[70%]">
          <div className="w-[200px] text-center">
            <p>Sale/Rent</p>
          </div>
          <div className="w-[200px] text-center">
            <p>Categories</p>
          </div>
          <div className="w-[200px] text-center">
            <p>Location</p>
          </div>
          <div className="w-[200px] text-center">
            <p>Price</p>
          </div>
          <div className="w-[200px] text-center">
            <p>Status</p>
          </div>
        </div>
        <div className="w-[14%] text-center">
        
        </div>
      </div>
    </div>
  );
};

export default FromDataListProperty;
