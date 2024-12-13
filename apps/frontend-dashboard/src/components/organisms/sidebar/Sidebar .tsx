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

        <Link href="/dashboard/properties">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/dashboard/properties')}`}>
            <PropertyHomeIcon />
            <p className="text-[14px] font-normal">Properties</p>
          </div>
        </Link>

        <Link href="/dashboard/agents">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/dashboard/agents')}`}>
            <UserAgentIcon />
            <p className="text-[14px] font-normal">Agents</p>
          </div>
        </Link>

        <Link href="/dashboard/customers">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/dashboard/customers')}`}>
            <UserCustomerIcon />
            <p className="text-[14px] font-normal">Customers</p>
          </div>
        </Link>

        <Link href="/dashboard/administrators">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/dashboard/administrators')}`}>
            <UserAdministatorIcon />
            <p className="text-[14px] font-normal">Administrators</p>
          </div>
        </Link>

        <Link href="/dashboard/account-setting/profile">
          <div className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive('/dashboard/account-setting/profile')} ${isActive('/account-setting/change_password')}`}>
            <UserAccSettingIcon />
            <p className="text-[14px] font-normal">Account Setting</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
