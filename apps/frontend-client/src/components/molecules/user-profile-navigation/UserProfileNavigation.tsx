// components/molecules/user-profile-navigation/UserProfileNavigation.tsx

"use client"; 
import React from "react";
import { usePathname } from "next/navigation"; // Hook to get the current path
import Link from "next/link";

interface UserProfileNavigationProps {
  userName: string;
}

const UserProfileNavigation = ({ userName }: UserProfileNavigationProps) => {
  const pathname = usePathname(); // Get the current path
  
  const isListedPropertiesActive = pathname === `/profile/${userName}`;
  const isSavedPropertiesActive = pathname === `/profile/saved-properties/${userName}`;

  return (
    <div className="w-full mt-[70px] mx-auto ">
      <div className="border-b border-neutral">
        <div className="flex max-w-[1300px] justify-start mx-auto font-helvetica text-helvetica-paragraph font-bold">
          <Link
            href={`/profile/${userName}`}
            className={`py-[20px] ml-[10px] xl:ml-0 ${
              isListedPropertiesActive
                ? "text-olive-green border-b-2 border-olive-green"
                : "text-charcoal border-b-2"
            }`}
          >
            Listed Properties
          </Link>
          <Link
            href={`/profile/saved-properties/${userName}`}
            className={`mx-[40px] py-[20px] ${
              isSavedPropertiesActive
                ? "text-olive-green border-b-2 border-olive-green"
                : "text-charcoal border-b-2"
            }`}
          >
            Saved Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfileNavigation;