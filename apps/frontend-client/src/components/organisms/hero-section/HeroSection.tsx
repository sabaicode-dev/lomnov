"use client";

// import HeroSectionSearch from "@/components/molecules/hero-section-serch/HeroSectionSearch";
import Image from "next/image";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import SelectProperties from "@/components/molecules/select-properties/SelectProperties";
async function fetchProperties(): Promise<RealEstateItem[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/properties");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

const options = [
  { label: "English", imgSrc: "/path/to/image1.jpg" },
  { label: "Khmer", imgSrc: "/path/to/image2.jpg" },
  // Add more options as needed
];
const defaultOption = { label: "Properties", imgSrc: "" };

function HeroSection() {
  // const data = await fetchProperties();

  return (
    <>
      <div className="w-full    h-screen relative ">
        <Image
          src={"https://wallpapercave.com/wp/wp4110653.jpg"}
          alt=""
          width="1000"
          height="1000"
          className="w-full h-full object-cover  "
          priority
        />
        <div className=" absolute left-0 top-0 w-full h-full bg-[#0000005a] ">
          <div className="flex flex-col gap-3 relative top-[65%] -translate-y-[65%] left-0 px-2 xl:px-0 w-full xl:w-[1300px] lg:m-auto">
            <h1 className=" uppercase text-white text-[25px]  sm:text-[30px] md:text-[40px] font-[700]">
              DISCOVER YOUR DREAM HOME
            </h1>
            <h3 className=" text-white  sm:text-[20px] md:text-[30px] font-[500]">
              Premier New Properies & Exclusive Luxury Real Esate
            </h3>
            <div>
              <div className="w-[150px] h-[50px] bg-white rounded-t-[18px] border-b-[0.5px] border-gray flex flex-row items-center justify-between">
                <div className="px-5 text-[18px] font-[600] border-r-[0.5px] border-gray">
                  Rent
                </div>
                <div className="px-5 text-[18px] font-[600]">Buy</div>
              </div>
              <div className=" w-full lg:w-fit  bg-white rounded-r-[18px] rounded-bl-[20px] lg:flex   grid grid-cols-2 lg:grid-cols-4 items-center gap-5 p-5 ">
                <SelectProperties
                  options={options}
                  defaultOption={defaultOption}
                />
                <SelectProperties
                  options={options}
                  defaultOption={defaultOption}
                />
                <SelectProperties
                  options={options}
                  defaultOption={defaultOption}
                />
                <button className=" bg-neutral text-white font-[600] px-5 py-2 rounded-md lg:w-[120px]">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <HeroSectionSearch properties ={data} /> */}
      </div>
    </>
  );
}

export default HeroSection;
