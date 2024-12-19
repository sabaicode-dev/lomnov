"use client";

import React, { useRef, useEffect } from "react";

interface FilterPopupProps {
  isVisible: boolean;
  onClose: () => void;
  selectedTransition: string;
  setSelectedTransition: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
}

const PropertyFilterPopup = ({
  isVisible,
  onClose,
  selectedTransition,
  setSelectedTransition,
  selectedLocation,
  setSelectedLocation,
}: FilterPopupProps) => {
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute top-[60px] right-[0px] w-[400px] bg-BgSoftWhite rounded-xl shadow-lg p-4 z-50"
      ref={filterRef}
    >
      <p className="text-[16px] font-[600] mb-[20px]">Filters</p>
      <form className="space-y-4">
        <div>
          <label htmlFor="transition-select">Transition*</label>
          <select
          id="transition-select"
            value={selectedTransition}
            onChange={(e) => setSelectedTransition(e.target.value)}
            className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px] focus:outline-none focus:border-Primary/20"
          >
            <option value="">Select transition</option>
            <option value="For Sale">Sale</option>
            <option value="For Rent">Rent</option>
          </select>
        </div>
        <div>
          <label htmlFor="location-select">Location*</label>
          <select
          id="location-select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px] focus:outline-none focus:border-Primary/20"
          >
            <option value="">Your city/province</option>
            <option value="Phnom Penh">Phnom Penh</option>
            <option value="Kom PongCham">Kom PongCham</option>
            <option value="Svay Reng">Svay Reng</option>
            <option value="Kep">Kep</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default PropertyFilterPopup;
