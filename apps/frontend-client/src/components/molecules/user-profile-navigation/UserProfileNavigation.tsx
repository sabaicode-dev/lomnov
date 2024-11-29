// components/molecules/user-profile-navigation/UserProfileNavigation.tsx

"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation"; // Hook to get the current path
import Link from "next/link";
import PropertyActions from "../properties-action/PropertyActions";

interface UserProfileNavigationProps {
  userName: string;
}

const UserProfileNavigation = ({ userName }: UserProfileNavigationProps) => {
  const pathname = usePathname(); // Get the current path
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  console.log(pathname);
  
  const isListedPropertiesActive = pathname === `/profile/${userName}`;
  console.log(isListedPropertiesActive);
  
  const isSavedPropertiesActive = pathname === `/profile/saved-properties/${userName}`;
  const handlePost = () => {
    if (selectedProperties.length > 0) {
      alert("Post selected properties");
    } else {
      alert("No properties selected to post");
    }
  };

  const handleUpdate = () => {
    if (selectedProperties.length === 1) {
      alert("Update selected property");
    } else {
      alert("Please select exactly one property to update");
    }
  };

  const handleDelete = () => {
    if (selectedProperties.length > 0) {
      alert("Delete selected properties");
    } else {
      alert("No properties selected to delete");
    }
  };
  return (
    <div className="w-full mt-[70px] mx-auto ">
      <div className="border-b border-neutral">
        <div className="flex justify-between items-center max-w-[1300px]  w-full m-auto ">
          <div className="flex w-full justify-start mx-auto font-helvetica text-helvetica-paragraph font-bold">
            <Link
              href={`/profile/${userName}`}
              className={`py-[20px] ml-[10px] xl:ml-0 ${isListedPropertiesActive
                ? "text-olive-green border-b-2 border-olive-green"
                : "text-charcoal border-b-2"
                }`}
            >
              Listed Properties
            </Link>
            <Link
              href={`/profile/saved-properties/${userName}`}
              className={`mx-[40px] py-[20px] ${isSavedPropertiesActive
                ? "text-olive-green border-b-2 border-olive-green"
                : "text-charcoal border-b-2"
                }`}
            >
              Saved Properties
            </Link>

          </div>
            <PropertyActions
              selectedProperties={selectedProperties}
              onPost={handlePost}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
        </div>
      </div>
    </div>
  );
};

export default UserProfileNavigation;