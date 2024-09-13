// components/molecules/profile-header/ProfileHeader.tsx

import React from "react";
import Image from "next/image";
import Banner from "@/components/molecules/banner/Banner";
import { FaCamera } from "react-icons/fa";
import VisitProfileNavigation from "../visit-profile-navigation/VisitProfileNavigation";
import ShareIcon from "@/icons/ShareIcon";

interface VisitProfileHeaderProps {
  user: {
    username: string;
    background: string;
    profile: string;
    fistname: string;
    lastname: string;
    joinedDate: string;
  };
}

const VisitProfileHeader = ({ user }: VisitProfileHeaderProps) => {
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
                {user.joinedDate} 15 jul 2033
              </span>
            </div>
          </div>

          <div className="flex absolute justify-end right-0 -bottom-[120px] space-x-[10px] items-center font-helvetica text-helvetica-paragraph text-charcoal pr-[10px] xl:pr-0">
            <button className="py-[5px] px-[25px] rounded-[8px] bg-neutral">
              Call Now
            </button>
            <button className="py-[5px] px-[25px] flex items-center justify-center rounded-[8px] bg-pale-gray">
              <ShareIcon props="w-[20px] h-[20px] text-olive-green mr-[5px]" />
              Share
            </button>
          </div>
        </div>
      </div>
      {/* UserProfileNavigation */}
      <VisitProfileNavigation username={user.username} />
    </>
  );
};

export default VisitProfileHeader;
