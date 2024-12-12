"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserAccSettingIcon from '@/components/atoms/icons/UserAccSettingIcon';
import UserAdministatorIcon from '@/components/atoms/icons/UserAdministatorIcon';
import UserCustomerIcon from '@/components/atoms/icons/UserCustomerIcon';
import UserAgentIcon from '@/components/atoms/icons/UserAgentIcon';
import PropertyHomeIcon from '@/components/atoms/icons/PropertyHomeIcon';
import GridIcon from '@/components/atoms/icons/GridIcon';

const Sidebar = () => {
  const pathname = usePathname(); // Get the current pathname

  // Function to check if the current route is active
  const isActive = (route: string) => {
    return pathname === route ? 'bg-Primary text-BgSoftWhite' : '';
  };

  return (
    <div className="w-[243px] h-[900px] bg-Bg p-[10px]">
      <div className="text-BlackSecondary gap-[10px]">
        <Link href="/dashboard">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/dashboard')}`}>
            <GridIcon />
            <p className="text-[14px] font-normal">Dashboard</p>
          </div>
        </Link>

        <Link href="/properties">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/properties')}`}>
            <PropertyHomeIcon />
            <p className="text-[14px] font-normal">Properties</p>
          </div>
        </Link>

        <Link href="/agents">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/agents')}`}>
            <UserAgentIcon />
            <p className="text-[14px] font-normal">Agents</p>
          </div>
        </Link>

        <Link href="/customers">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/customers')}`}>
            <UserCustomerIcon />
            <p className="text-[14px] font-normal">Customers</p>
          </div>
        </Link>

        <Link href="/administrators">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/administrators')}`}>
            <UserAdministatorIcon />
            <p className="text-[14px] font-normal">Administrators</p>
          </div>
        </Link>

        <Link href="/account-setting/profile">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/account-setting/profile')} ${isActive('/account-setting/change_password')}`}>
            <UserAccSettingIcon />
            <p className="text-[14px] font-normal">Account Setting</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
