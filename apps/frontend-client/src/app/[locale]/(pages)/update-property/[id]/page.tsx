import axiosInstance from '@/libs/axios';
import { API_ENDPOINTS } from '@/libs/const/api-endpoints';
import { IUpdatePropertiesType } from '@/libs/types/api-properties/property-response';
import Image from 'next/image';
import banner from "@/images/banner.png";
import React from 'react'
import UpdateProperties from '@/components/organisms/update-property/UpdateProperties';
async function fetchProperty(id: string): Promise<IUpdatePropertiesType> {
  try {
    // Fetch property details
    const response = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}/get/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error; // Rethrow to ensure the caller can handle the error
  }
}
export default async function page({ params }: { params: { id: string } }) {
  const property = await fetchProperty(params.id);
  //console.log("Your Property :::", property)
  return (
    <main className='w-full bg-[#E6E6E6]'>
      {/* banner */}
      <header className="relative w-full h-[300px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>
      </header>
      <div className='w-full h-full'>
        <UpdateProperties item={property}/>
      </div>
    </main>
  )
}
