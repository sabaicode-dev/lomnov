import React from 'react';
import Image from 'next/image';
import Logo from "@/images/lomnov-logo.png";
import { IoSearch } from "react-icons/io5";
import { MdPersonOutline } from "react-icons/md";
import SearchHeader from '@/components/atoms/search-header/SearchHeader';

type HeaderProps = {
  profile: string[] | undefined;
}

const Header = ({ profile }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between py-[10px] px-[20px] sm:px-[40px] bg-Bg border-b-2 border-Black/10">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image src={Logo} alt="logo" width={129} height={43.13} />
      </div>

      {/* Search Input Section */}
      <div className="flex items-center gap-[10px] sm:gap-[15px]">
        {/* Search Bar */}
        <div className="flex items-center bg-white border rounded-lg shadow-sm px-5 w-48 sm:w-80">
          <IoSearch className="text-gray-500 w-5 h-5 mr-2" />
          <SearchHeader />
        </div>

        {/* Language Selector and Profile Section */}
        <div className="flex gap-[10px] sm:gap-[15px] items-center">
          {/* Language Selector */}
         

          {/* Profile Picture */}
          <div className="w-[42px] h-[42px] overflow-hidden text-BgSoftWhite flex items-center justify-center bg-Black font-[14px] rounded-full">
            {profile && profile.length > 0 ? (
              <Image width={100} height={100} src={profile[0]} objectFit="cover" alt="Profile Image" />
            ) : (
              <MdPersonOutline className="text-[16px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
