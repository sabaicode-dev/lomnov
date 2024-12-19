import React from 'react'
import PhotoAttachment from "@/components/molecules/photo-attachment/PhotoAttachment";
import StatusEdit from '@/components/molecules/status-edit/StatusEdit';
import OverviewCustomer from '@/components/molecules/overview-customer/OverviewCustomer';
import { CustomerResponseType } from '@/libs/types/api-customers/customer-response';
import { API_ENDPOINTS } from '@/libs/const/api-endpionts';
import axiosInstance from '@/libs/axios';
import Default_Profile from "@/images/default-profile.jpg";
import Link from 'next/link';

//======================
async function fetchCustomer(username: string): Promise<CustomerResponseType | null> {
  try {
    const response = await axiosInstance.get(`${API_ENDPOINTS.USER}`);
    console.log("API Customer Response:", response.data);

    // Decode the username and filter for the user
    const decodedUsername = decodeURIComponent(username);
    const user = response.data.users.find(
      (user: CustomerResponseType) => user.userName === decodedUsername
    );

    if (!user) {
      console.warn(`User with username "${decodedUsername}" not found.`);
      return null;
    }

    // Assign a default profile image if none exists
    if (!user.profile || user.profile.length === 0) {
      user.profile = [Default_Profile.src];
    }

    return user; // Return the user with a default profile if necessary
  } catch (error: any) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
}


const page = async ({ params }: { params: { username: string } }) => {
  const customer = await fetchCustomer(params.username);

  if (!customer) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-500">Customer not found.</p>
        <Link href="/dashboard/customers">
          <button className="mt-4 px-4 py-2 bg-Primary text-BgSoftWhite rounded-lg">
            Back to Customers
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[30px] font-black ">View Customer</p>
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <OverviewCustomer item={customer} />
          <PhotoAttachment initialImages={customer.profile} defaultProfile={Default_Profile.src} />
        </div>
        <div className="w-[30%]">
          <StatusEdit item={customer} />
        </div>
      </div>
      <div className="flex justify-start w-[100%] mt-[20px] items-center gap-[4px]">
        <Link href={"/dashboard/customers"}>
          <button className="px-[30px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};


export default page;