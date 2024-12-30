'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserAccSettingIcon from '@/components/atoms/icons/UserAccSettingIcon';
import UserAdministatorIcon from '@/components/atoms/icons/UserAdministatorIcon';
import UserCustomerIcon from '@/components/atoms/icons/UserCustomerIcon';
import UserAgentIcon from '@/components/atoms/icons/UserAgentIcon';
import PropertyHomeIcon from '@/components/atoms/icons/PropertyHomeIcon';
import GridIcon from '@/components/atoms/icons/GridIcon';

const routes = [
  {
    label: 'Dashboard',
    paths: ['/dashboard'],
    icon: <GridIcon />,
  },
  {
    label: 'Properties',
    paths: ['/dashboard/properties', '/dashboard/add-new-property', '/dashboard/view-property/', '/dashboard/update-property'],
    icon: <PropertyHomeIcon />,
  },
  {
    label: 'Agents',
    paths: ['/dashboard/agents', '/dashboard/add-new-agents', '/dashboard/view-agents/', '/dashboard/update-agents'],
    icon: <UserAgentIcon />,
  },
  {
    label: 'Customers',
    paths: ['/dashboard/customers', '/dashboard/add-new-customer', '/dashboard/view-customer/', '/dashboard/update-customer'],
    icon: <UserCustomerIcon />,
  },
  {
    label: 'Administrators',
    paths: ['/dashboard/administrators', '/dashboard/add-new-administrator', '/dashboard/update-administrator'],
    icon: <UserAdministatorIcon />,
  },
  {
    label: 'Account Setting',
    paths: ['/dashboard/account-setting/profile', '/dashboard/account-setting/change-password'],
    icon: <UserAccSettingIcon />,
  },
];

const Sidebar = () => {
  const pathname = usePathname(); // Get the current pathname

  // Function to check if the current route is active
  const isActive = (routePaths: string[]) => {
    return routePaths.some((route) => {
      // Check if the pathname matches any of the route paths
      if (route.endsWith('/')) {
        // If route ends with a slash, we check for partial matches
        return pathname.startsWith(route);
      }
      return pathname === route; // Exact match
    }) ? 'bg-Primary text-BgSoftWhite' : '';
  };


  return (
    <div className="w-[243px] bg-Bg p-[10px] sm:w-[200px] md:w-[250px] lg:w-[300px] hidden sm:block">
      <div className="text-BlackSecondary gap-[10px] w-full h-full">
        {routes.map(({ label, paths, icon }) => (
          <Link key={label} href={paths[0]}>
            <div
              className={`flex gap-[12px] items-center w-[223px] h-[38px] rounded-sm px-[12px] py-[5px] mb-[10px] ${isActive(paths)}`}
            >
              <div>{icon}</div>
              <p className="text-[14px] font-normal">{label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
