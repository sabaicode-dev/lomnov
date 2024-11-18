import React from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import banner from "@/images/banner.png";
import Image from "next/image";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import axios from "axios";
import Search from "@/components/molecules/Search/Search";
import NotFound from "@/components/molecules/notFound/NotFound";

async function fetchProperties(searchParams: { [key: string]: string | string[] | undefined }): Promise<RealEstateItem[]> {
  const queryString = new URLSearchParams(searchParams as Record<string, string>).toString();
  const res = await axios.get(`${API_ENDPOINTS.PROPERTIES}?${queryString}`);
  
  if (res.status!==200) {
    throw new Error("Failed to fetch properties");
  }

  const data = await res.data
  
  console.log("API Response:", data);  // Log the full response to inspect it

  // Check if the response contains properties as expected
  if (data && data.properties && Array.isArray(data.properties)) {
    return data.properties; // Return the properties array if valid
  }

  console.error("Invalid response data", data);  // Log if the response is not in the expected format
  return [];  // Return an empty array as a fallback
}

async function page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  let datas: RealEstateItem[] = [];

  try {
    datas = await fetchProperties(searchParams);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return <div>Failed to load properties. Please try again later.</div>; // Show a message if there's an error
  }

  if (!Array.isArray(datas) || datas.length === 0) {
    return <NotFound/>// Show message if no data is found
  }

  return (
    <main className="">
      {/* Banner */}
      <header className="relative w-full h-[400px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75 left-0"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>

        <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
          <h1>Find Your Perfect Property</h1>
        </div>

        <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[462px] h-px bg-white"></div>
          {/* Search*/}
       
        <div className=" absolute w-full lg:bottom-[-40px] bottom-[-60px] px-2 lg:px-0  ">
          <div className="  z-10  m-auto lg:w-fit  bg-white rounded-[18px]  lg:flex   grid grid-cols-2 lg:grid-cols-4 items-center gap-5 p-5 ">

           <Search/>

          </div>
        </div>
      </header>

      <div className="w-[1300px] m-auto grid grid-cols-4 gap-5 mt-[100px] z-0">
        {datas.map((item) => (
          <ItemCard key={item._id} item={item} flexRow={false} />
        ))}
      </div>
    </main>
  );
}

export default page;
