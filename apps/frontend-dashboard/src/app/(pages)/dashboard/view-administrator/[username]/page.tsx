import React from 'react';
import { CustomerResponseType } from '@/libs/types/api-customers/customer-response';
import { API_ENDPOINTS } from '@/libs/const/api-endpionts';
import axiosInstance from '@/libs/axios';
import Default_Profile from "@/images/default-profile.jpg";
import Link from 'next/link';
import OverviewAdministrator from '@/components/molecules/overview-administrator/OverviewAdmin';
import PhotoAttachmentViewUser from '@/components/molecules/photo-attach-view-user/PhotoAttachmentViewUser';
import StatusEdit from '@/components/molecules/status-edit/StatusEdit';

async function fetchCustomer(username: string): Promise<CustomerResponseType> {
  try {
    const response = await axiosInstance.get(`${API_ENDPOINTS.USER}`);
    const decodedUsername = decodeURIComponent(username);
    const user = response.data.users.find(
      (user: CustomerResponseType) => user.userName === decodedUsername
    );
    if (!user.profile || user.profile.length === 0) {
      user.profile = [Default_Profile.src];
    }

    return user;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
}

export default async function Page(params: { params: Promise<{ username: string }> }) {
  const username = (await (params).params).username

  const customer = await fetchCustomer(username);

  // if (!customer) {
  //   return (
  //     <div className="text-center mt-10">
  //       <p className="text-xl text-red-500">Customer not found.</p>
  //       <Link href="/dashboard/administrators">
  //         <button className="mt-4 px-4 py-2 bg-Primary text-BgSoftWhite rounded-lg">
  //           Back to Administrator
  //         </button>
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div>
      <p className="text-[30px] font-black">View Administrator</p>
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <OverviewAdministrator item={customer!} />
          <PhotoAttachmentViewUser initialImages={customer!.profile} defaultProfile={Default_Profile.src} />
        </div>
        <div className="w-[30%]">
          <StatusEdit item={customer!} />
        </div>
      </div>
      <div className="flex justify-start w-[100%] mt-[20px] items-center gap-[4px]">
        <Link href="/dashboard/administrators">
          <button className="px-[30px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};
