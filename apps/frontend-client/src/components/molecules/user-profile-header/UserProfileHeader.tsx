// components/molecules/profile-header/ProfileHeader.tsx

import React from "react";
import Image from "next/image";
import Banner from "@/components/molecules/banner/Banner";
import { FaCamera } from "react-icons/fa";
import UserProfileNavigation from "../user-profile-navigation/UserProfileNavigation";

interface UserProfileHeaderProps {
  user: {
    username:string
    background: string;
    profile: string;
    fistname: string;
    lastname: string;
  };
}

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  return (
    <>
      <div className="relative">
        <Banner background={user.background} />
        <div className="max-w-[1300px] mx-auto relative">
          {/* Edit cover photo button */}
          <div className="absolute right-[0px] bottom-[50px]  flex justify-end pr-[10px] xl:pr-0">
            <div className="flex items-center bg-white font-helvetica text-helvetica-paragraph text-charcoal px-[10px] py-[5px] rounded-md">
              <label
                htmlFor="file-input"
                className="cursor-pointer flex items-center justify-center"
              >
                <FaCamera className="text-charcoal mx-[10px]" />
                <span>Edit cover photo</span>
              </label>
              <input type="file" id="file-input" className="hidden" />
            </div>
          </div>

          <div className="flex items-center pl-[10px] xl:pl-0 mt-[30px]">
            {/* User profile */}
            <div className="absolute flex items-center justify-center sm:w-[135px] sm:h-[135px] w-[125px] h-[125px] rounded-full bg-grayish-white">
              <div className="sm:w-[125px] sm:h-[125px] w-[120px] h-[120px] rounded-full overflow-hidden bg-grayish-white">
                <Image src={user.profile} alt="user" width={125} height={125} />
              </div>
              <label
                htmlFor="profile-photo-input"
                className="sm:ml-[100px] sm:mt-[70px] ml-[100px] mt-[70px] absolute sm:w-[37px] w-[25px] h-[25px] flex items-center justify-center sm:h-[37px] rounded-full bg-pale-gray cursor-pointer"
              >
                <FaCamera className="text-charcoal sm:w-[20px] sm:h-[20px] w-[15px] h-[15px]" />
              </label>
              <input type="file" id="profile-photo-input" className="hidden" />
            </div>
            {/* User name */}
            <div className="absolute left-[170px] items-center text-helvetica-small font-helvetica text-olive-gray mt-[10px]">
              <span className="font-helvetica text-helvetica-h4 font-bold text-charcoal capitalize">
                {user.fistname} {user.lastname}
              </span>
              <span className="flex items-center mt-[10px]">
                Joined
                <div className="w-[5px] h-[5px] mx-[5px] rounded-full bg-olive-gray"></div>
                Jul 15 2023
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* UserProfileNavigation */}
      <UserProfileNavigation username={user.username} />
    </>
  );
};

export default UserProfileHeader;
