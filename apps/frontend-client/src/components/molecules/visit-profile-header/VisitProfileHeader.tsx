"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Banner from "@/components/molecules/banner/Banner";
import VisitProfileNavigation from "../visit-profile-navigation/VisitProfileNavigation";
import { IoCall } from "react-icons/io5";
import { BiLogoMessenger } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import { VisitProfileHeaderProps } from "@/libs/types/user-types/user";
import { formatDate } from "@/libs/functions/formatDate";
import SharesToSocial from "@/components/atoms/shares-social/SharesToSocial";

const VisitProfileHeader = ({ user }: { user: VisitProfileHeaderProps }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const cognitosub = user?.user?.cognitoSub;

  return (
    <>
      <div className="relative">
        <Banner background={user?.user?.background?.[user?.user?.background.length - 1] ?? '/images/default-banner.jpg'} />
        <div className="max-w-[1300px] mx-auto relative">
          <div className="flex items-center pl-[10px] xl:pl-0 mt-[30px]">
            <div className="absolute flex items-center justify-center sm:w-[135px] sm:h-[135px] w-[125px] h-[125px] rounded-full bg-grayish-white">
              <div className="sm:w-[125px] sm:h-[125px] w-[120px] h-[120px] rounded-full overflow-hidden bg-grayish-white">
                <Image
                  src={user?.user?.profile?.[user?.user?.profile.length - 1] ?? '/images/default-profile.jpg'}
                  alt="user"
                  width={125}
                  height={125}
                />
              </div>
            </div>
            <div className="absolute left-[170px] items-center text-helvetica-small font-helvetica text-olive-gray mt-[10px]">
              <span className="font-helvetica text-helvetica-h4 font-bold text-charcoal capitalize">
                {user?.user?.userName ?? "Unknown"}
              </span>
              <span className="flex items-center mt-[10px]">
                Joined
                <div className="w-[5px] h-[5px] mx-[5px] rounded-full bg-olive-gray"></div>
                {user?.user?.createdAt ? formatDate(user?.user?.createdAt) : 'Unknown date'}
              </span>
            </div>
          </div>

          <div className="flex absolute justify-end right-0 -bottom-[120px] space-x-[10px] items-center font-helvetica text-helvetica-paragraph text-charcoal pr-[10px] xl:pr-0">
            <button className="py-[5px] px-[24px] flex items-center justify-center rounded-[8px] bg-olive-drab text-white hover:bg-neutral hover:text-gray-600 transition-all duration-200 ease-in-out">
              <BiLogoMessenger className="w-5 h-5 mr-[8px]" />
              Chat Now
            </button>
            <button
              onClick={() => window.open(`tel:`)}
              className="py-[5px] px-[24px] flex items-center justify-center rounded-[8px] bg-olive-drab text-white hover:bg-neutral hover:text-gray-600 transition-all duration-200 ease-in-out"
            >
              <IoCall className="w-5 h-5 mr-[8px]" />
              Call Now
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                className="py-[5px] px-[24px] flex items-center justify-center rounded-[8px] bg-olive-drab text-white hover:bg-neutral hover:text-gray-600 transition-all duration-200 ease-in-out"
                onClick={toggleDropdown}
              >
                <FaShareAlt className="mr-[8px]" />
                Share
              </button>
              {isDropdownOpen && <SharesToSocial linkURL={window.location.href} />}
            </div>
          </div>
        </div>
      </div>

      <VisitProfileNavigation cognitosub={cognitosub!} />
    </>
  );
};

export default VisitProfileHeader;
