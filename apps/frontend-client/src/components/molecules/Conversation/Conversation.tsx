import React from 'react'
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import Image from 'next/image';

interface ConversationProps {
  params: { cognitosub: string };
  sidebar: boolean;
  toggleSidebar: () => void;
}

const Conversation = async ({ params, sidebar, toggleSidebar }: ConversationProps ) => {
  async function fetchUserDetails(cognitosub: string) {
    try {
      const res = await axiosInstance.get(
        `${API_ENDPOINTS.GET_PROFILE_USER}/${cognitosub}`,
      );
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch user details");
    }
  }

  const user = await fetchUserDetails(params.cognitosub);

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
<div className="absolute grid grid-cols-2 overflow-y-auto h-[85vh] px-4 py-4 space-y-4 bg-white scroll-smooth inset-x-0">
        {/* 1st column */}

        <div className="flex items-center ps-3">
          <Image
            src={
              user?.user?.profile?.length
                ? user.user.profile[user?.user.profile.length - 1]
                : "/default-profile.jpeg"
            }
            alt="user"
            width={25}
            height={25}
            className="rounded-full"
          />

          <div>
            <span className="ms-5 bg-[#BCBCBC] w-[200px] h-[40px] flex justify-center items-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-md">
              Hello
            </span>
            <div className="ms-5 grid grid-cols-2">
              <p className="text-[10px] text-[#424242] flex justify-start">
                Delivery
              </p>
              <p className="text-[10px] text-[#424242] flex justify-end">
                6:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center ps-3 pt-32 sm:ms-[90px] lg:ms-[100px]">
          <div>
            <span className=" bg-[#79826A] text-white w-[200px] h-[40px] flex justify-center items-center rounded-tl-2xl rounded-tr-2xl rounded-br-md rounded-bl-2xl">
              Hello
            </span>
            <div className=" grid grid-cols-2">
              <p className="text-[10px] text-[#424242] flex justify-start">
                6:00 PM
              </p>
              <p className="text-[10px] text-[#424242] flex justify-end">
                Delivery
              </p>
            </div>
          </div>
          <Image
            src={
              user?.user?.profile?.length
                ? user.user.profile[user?.user.profile.length - 1]
                : "/default-profile.jpeg"
            }
            alt="user"
            width={25}
            height={25}
            className="rounded-full ms-5"
          />
        </div>

        {/* 2nd column */}

        <div className="flex items-center ps-3">
          <Image
            src={
              user?.user?.profile?.length
                ? user.user.profile[user?.user.profile.length - 1]
                : "/default-profile.jpeg"
            }
            alt="user"
            width={25}
            height={25}
            className="rounded-full"
          />

          <div>
            <span className="ms-5 bg-[#BCBCBC] w-[200px] h-[40px] flex justify-center items-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-md">
              Hello
            </span>
            <div className="ms-5 grid grid-cols-2">
              <p className="text-[10px] text-[#424242] flex justify-start">
                Delivery
              </p>
              <p className="text-[10px] text-[#424242] flex justify-end">
                6:00 PM
              </p>
            </div>
          </div>
        </div>


        <div className="flex items-center ps-3 pt-32 sm:ms-[90px] lg:ms-[100px]">
          <div>
            <span className=" bg-[#79826A] text-white w-[200px] h-[40px] flex justify-center items-center rounded-tl-2xl rounded-tr-2xl rounded-br-md rounded-bl-2xl">
              Hello
            </span>
            <div className=" grid grid-cols-2">
              <p className="text-[10px] text-[#424242] flex justify-start">
                6:00 PM
              </p>
              <p className="text-[10px] text-[#424242] flex justify-end">
                Delivery
              </p>
            </div>
          </div>
          <Image
            src={
              user?.user?.profile?.length
                ? user.user.profile[user?.user.profile.length - 1]
                : "/default-profile.jpeg"
            }
            alt="user"
            width={25}
            height={25}
            className="rounded-full ms-5"
          />
        </div>

        {/* 3rd column  */}

        <div className="flex items-center ps-3">
          <Image
            src={
              user?.user?.profile?.length
                ? user.user.profile[user?.user.profile.length - 1]
                : "/default-profile.jpeg"
            }
            alt="user"
            width={25}
            height={25}
            className="rounded-full"
          />

          <div>
            <span className="ms-5 bg-[#BCBCBC] w-[200px] h-[40px] flex justify-center items-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-md">
              Hello
            </span>
            <div className="ms-5 grid grid-cols-2">
              <p className="text-[10px] text-[#424242] flex justify-start">
                Delivery
              </p>
              <p className="text-[10px] text-[#424242] flex justify-end">
                6:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center ps-3 pt-32 sm:ms-[90px] lg:ms-[100px]">
          <div>
            <span className=" bg-[#79826A] text-white w-[200px] h-[40px] flex justify-center items-center rounded-tl-2xl rounded-tr-2xl rounded-br-md rounded-bl-2xl">
              Hello
            </span>
            <div className=" grid grid-cols-2">
              <p className="text-[10px] text-[#424242] flex justify-start">
                6:00 PM
              </p>
              <p className="text-[10px] text-[#424242] flex justify-end">
                Delivery
              </p>
            </div>
          </div>
          <Image
            src={
              user?.user?.profile?.length
                ? user.user.profile[user?.user.profile.length - 1]
                : "/default-profile.jpeg"
            }
            alt="user"
            width={25}
            height={25}
            className="rounded-full ms-5"
          />
        </div>

        {/* 4th column */}

        <div className="flex items-center ps-3">
          <Image
            src={
              user?.user?.profile?.length
                ? user.user.profile[user?.user.profile.length - 1]
                : "/default-profile.jpeg"
            }
            alt="user"
            width={25}
            height={25}
            className="rounded-full"
          />

          <div>
            <span className="ms-5 bg-[#BCBCBC] w-[200px] h-[40px] flex justify-center items-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-md">
              Hello
            </span>
            <div className="ms-5 grid grid-cols-2">
              <p className="text-[10px] text-[#424242] flex justify-start">
                Delivery
              </p>
              <p className="text-[10px] text-[#424242] flex justify-end">
                6:00 PM
              </p>
            </div>
          </div>
        </div>
        {/* 5th column */}


        <div className="flex items-center ps-3 pt-32 sm:ms-[90px] lg:ms-[100px]">
          <div>
            <span className=" bg-[#79826A] text-white w-[200px] h-[40px] flex justify-center items-center rounded-tl-2xl rounded-tr-2xl rounded-br-md rounded-bl-2xl">
              Hello
            </span>
            <div className=" grid grid-cols-2">
              <p className="text-[10px] text-[#424242] flex justify-start">
                6:00 PM
              </p>
              <p className="text-[10px] text-[#424242] flex justify-end">
                Delivery
              </p>
            </div>
          </div>
          <Image
            src={
              user?.user?.profile?.length
                ? user.user.profile[user?.user.profile.length - 1]
                : "/default-profile.jpeg"
            }
            alt="user"
            width={25}
            height={25}
            className="rounded-full ms-5"
          />
        </div>
      </div>

    </div>
  )
}

export default Conversation;
