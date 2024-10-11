import React from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import banner from "@/images/banner.png";
import Image from "next/image";
import { useParams } from "next/navigation";
// ===============================================

// async function fetchProperties(searchParams: { [key: string]: string | string[] | undefined }): Promise<RealEstateItem[]> {
// console.log(searchParams)
  //   const queryString = new URLSearchParams(searchParams as Record<string, string>).toString();
//   const res = await fetch(`https://lomnov.onrender.com/api/v1/properties?${queryString}`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch");
//   }
//   return res.json();
// }
async function page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
//   console.log(searchParams.category)
//   console.log(searchParams.property)
//   console.log(searchParams.location)
//   const datas = await fetchProperties(searchParams);
  return (
    <>
      <main className="">
        {/* Banner */}
        {/* <header className="relative w-full h-[400px]">
          <Image
            src={banner}
            alt="banner"
            layout="fill"
            objectFit="cover"
            className="brightness-75  left-0"
          />

          <div className=" absolute left-0 top-0 w-full h-full bg-[#0000004e]">

          </div>


          <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
            <h1>Find Your Perfect Property</h1>
          </div>

          <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[462px] h-px bg-white"></div>

          <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[85px] font-helvetica text-sm md:text-base lg:text-helvetica-paragraph text-white">
            <p>Customize your search below.</p>
          </div>
        </header> */}
{/*
        <div className="w-[1300px] m-auto grid grid-cols-4 gap-5 mt-5">
          {datas.map((item) => (
            <ItemCard key={item.id} item={item} flexRow={false} />
          ))}
        </div> */}


      </main>
    </>
  );
}

export default page;
