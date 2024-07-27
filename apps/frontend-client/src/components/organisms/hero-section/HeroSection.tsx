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
const defaultOption = { label: "English", imgSrc: "" };

async function HeroSection() {
  const data = await fetchProperties();

  return (
    <>
      <div className="w-full h-screen md:h-[300px]  lg:h-screen bg-blue-500 relative ">
        <Image
          src={"https://wallpapercave.com/wp/wp4110653.jpg"}
          alt=""
          width="1000"
          height="1000"
          className="w-full h-full object-cover  "
          priority
        />
        <div className=" absolute left-0 top-0 w-full h-full bg-[#0000005a] ">
          <div className="flex flex-col gap-3 relative top-[65%] -translate-y-[65%] left-0 px-2 w-[1300px] m-auto">
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
              <div className="w-fit h-[80px] bg-white rounded-r-[18px] rounded-bl-[20px] flex items-center gap-5 px-5 ">
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
              <button className=" text-black p-5">  Search </button>
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
