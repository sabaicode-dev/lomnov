'use client'

import React, { useState } from "react";
import Image from "next/image";
import Banner from "@/components/molecules/banner/Banner";
import { FaCamera } from "react-icons/fa";
import UserProfileNavigation from "../user-profile-navigation/UserProfileNavigation";
import { User } from "@/context/user.type";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

interface UserProfileHeaderProps {
  user: User;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  const [userState, setUserState] = useState<User>(user);

  const handleProfileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("profileFiles", file);

    try {
      const response = await axiosInstance.put(API_ENDPOINTS.USER_PROFILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data) {
        console.log("Profile photo uploaded successfully:", response.data);
        setUserState((prevUser: User) => ({
          ...prevUser,
          profile: response.data.profile, // Update profile array from the backend response
        }));
      } else {
        console.log("Something went wrong with the profile upload");
      }
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  const handleBackgroundChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("backgroundFiles", file);

    try {
      const response = await axiosInstance.put(API_ENDPOINTS.USER_PROFILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data) {
        console.log("Background photo uploaded successfully:", response.data);
        setUserState((prevUser: User) => ({
          ...prevUser,
          background: response.data.background, // Update background array from the backend response
        }));
      } else {
        console.log("Something went wrong with the background upload");
      }
    } catch (error) {
      console.error("Error uploading background photo:", error);
    }
  };

  return (
    <>
      <div className="relative">
        {/* Background Image */}
        <Banner
          background={
            userState.background?.[userState.background.length - 1] || "/images/default-banner.jpg"
          }
        />
        <div className="max-w-[1300px] mx-auto relative">
          {/* Edit cover photo button */}
          <div className="absolute right-[0px] bottom-[50px] flex justify-end pr-[10px] xl:pr-0">
            <div className="flex items-center bg-white font-helvetica text-helvetica-paragraph text-charcoal px-[10px] py-[5px] rounded-md">
              <label
                htmlFor="file-input"
                className="cursor-pointer flex items-center justify-center"
              >
                <FaCamera className="text-charcoal mx-[10px]" />
                <span>Edit cover photo</span>
              </label>
              <input type="file" id="file-input" className="hidden" onChange={handleBackgroundChange} />
            </div>
          </div>

          <div className="flex items-center pl-[10px] xl:pl-0 mt-[30px]">
            {/* User Profile Photo */}
            <div className="absolute flex items-center justify-center sm:w-[135px] sm:h-[135px] w-[125px] h-[125px] rounded-full bg-grayish-white">
              <div className="sm:w-[125px] sm:h-[125px] w-[120px] h-[120px] rounded-full overflow-hidden bg-grayish-white">
                <Image
                  src={
                    userState.profile?.[userState.profile.length - 1]
                      ? `${userState.profile[userState.profile.length - 1]}?t=${new Date().getTime()}`
                      : "/images/default-profile.jpg"
                  }
                  alt="user"
                  width={125}
                  height={125}
                />
              </div>
              <label
                htmlFor="profile-photo-input"
                className="sm:ml-[100px] sm:mt-[70px] ml-[100px] mt-[70px] absolute sm:w-[37px] w-[25px] h-[25px] flex items-center justify-center sm:h-[37px] rounded-full bg-pale-gray cursor-pointer"
              >
                <FaCamera className="text-charcoal sm:w-[20px] sm:h-[20px] w-[15px] h-[15px]" />
              </label>
              <input type="file" id="profile-photo-input" className="hidden" onChange={handleProfileChange} />
            </div>
            {/* User Info */}
            <div className="absolute left-[170px] items-center text-helvetica-small font-helvetica text-olive-gray mt-[10px]">
              <span className="font-helvetica text-helvetica-h4 font-bold text-charcoal capitalize">
                {userState.userName || "Unknown"}
              </span>
              <span className="flex items-center mt-[10px]">
                Joined
                <div className="w-[5px] h-[5px] mx-[5px] rounded-full bg-olive-gray"></div>
                {formatDate(userState.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* UserProfileNavigation */}
      <UserProfileNavigation userName={userState.userName} />
    </>
  );
};

export default UserProfileHeader;
