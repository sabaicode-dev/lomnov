'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Cropper from 'react-easy-crop'; // Cropper library
import Banner from '@/components/molecules/banner/Banner';
import { FaCamera } from 'react-icons/fa';
import UserProfileNavigation from '../user-profile-navigation/UserProfileNavigation';
import { User } from '@/context/user.type';
import axiosInstance from '@/libs/axios';
import { API_ENDPOINTS } from '@/libs/const/api-endpoints';
import getCroppedImg from '@/libs/cropImage';

interface UserProfileHeaderProps {
  user: User;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Unknown date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  const [userState, setUserState] = useState<User>(user);
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Image for cropping
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Crop position
  const [zoom, setZoom] = useState(1); // Zoom level
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null); // Cropped area
  const [isCropModalOpen, setIsCropModalOpen] = useState(false); // Modal for cropping
  const [isProfileCrop, setIsProfileCrop] = useState(false); // To differentiate between profile and background crops

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isProfile: boolean) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsCropModalOpen(true);
      setIsProfileCrop(isProfile); // Set crop type
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async () => {
    try {
      if (!croppedAreaPixels || !imageSrc) return;

      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

      const formData = new FormData();
      const endpoint = isProfileCrop ? 'profileFiles' : 'backgroundFiles';
      formData.append(endpoint, croppedImage);

      const response = await axiosInstance.put(API_ENDPOINTS.USER_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.data) {
        console.log(`${isProfileCrop ? 'Profile' : 'Background'} photo uploaded successfully`);
        setUserState((prevUser) => ({
          ...prevUser,
          [isProfileCrop ? 'profile' : 'background']: response.data[isProfileCrop ? 'profile' : 'background'],
        }));
        setIsCropModalOpen(false); // Close modal after upload
      }
    } catch (error) {
      console.error('Error cropping and uploading image:', error);
    }
  };

  return (
    <>
      <div className="relative">
        {/* Background Image */}
        <Banner
          background={
            userState.background?.[userState.background.length - 1] || '/images/default-banner.jpg'
          }
        />
        <div className="max-w-[1300px] mx-auto relative">
          {/* Edit cover photo button */}
          <div className="absolute right-[0px] bottom-[50px] flex justify-end pr-[10px] xl:pr-0">
            <div className="flex items-center bg-white font-helvetica text-helvetica-paragraph text-charcoal px-[10px] py-[5px] rounded-md">
              <label
                htmlFor="background-input"
                className="cursor-pointer flex items-center justify-center"
              >
                <FaCamera className="text-charcoal mx-[10px]" />
                <span>Edit cover photo</span>
              </label>
              <input
                type="file"
                id="background-input"
                className="hidden"
                onChange={(e) => handleFileChange(e, false)} // Handle background crop
              />
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
                      : '/images/default-profile.jpg'
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
              <input
                type="file"
                id="profile-photo-input"
                className="hidden"
                onChange={(e) => handleFileChange(e, true)} // Handle profile crop
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for cropping */}
      {isCropModalOpen && imageSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold mb-4">
              Crop Your {isProfileCrop ? 'Profile Picture' : 'Background Image'}
            </h3>
            <div className="relative w-[300px] h-[300px]">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={isProfileCrop ? 1 : 16 / 9} 
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setIsCropModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-8 py-2 rounded-md"
                onClick={handleCropComplete}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UserProfileNavigation */}
      <UserProfileNavigation userName={userState.userName} />
    </>
  );
};

export default UserProfileHeader;
