
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
    <div className="flex items-center justify-between py-[10px] px-[40px] bg-Bg border-b-2 border-Black/10">
      {/* Logo Section */}
      <div>
        <Image src={Logo} alt="logo" width={129} height={43.13} />
      </div>

      {/* Search Input Section */}
      <div className='flex justify-between gap-[10px]'>
        <div className='flex items-center bg-white border rounded-lg shadow-sm px-5 w-80'>
          <IoSearch className="text-gray-500 w-5 h-5 mr-2 " />
          <SearchHeader />
        </div>
        <div className='flex justify-between gap-[10px]'>
          <div className='w-[42px] h-[42px] bg-Primary flex items-center justify-center text-BgSoftWhite  rounded-full'><p className='text-[12px]'>ENG</p></div>
          <div className='w-[42px] h-[42px] overflow-hidden text-BgSoftWhite flex items-center justify-center bg-Black font-[14px] rounded-full'>
            {profile && profile.length > 0 ? (
              <Image width={100} height={100} src={profile[0]} objectFit='cover' alt="Profile Image" />
            ) : (
              <MdPersonOutline className='text-[16px]' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
