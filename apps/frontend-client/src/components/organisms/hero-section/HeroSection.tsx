import HeroSectionSearch from "@/components/molecules/hero-section-serch/HeroSectionSearch";
import Image from "next/image";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
async function fetchProperties():Promise<RealEstateItem[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/properties");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

async function HeroSection() {
  const data = await fetchProperties();

  return (
    <>
      <div className="w-full h-[230px] md:h-[300px]  lg:h-[350px] bg-blue-500 relative ">
        <Image
          src={"https://wallpapercave.com/wp/wp4110653.jpg"}
          alt=""
          width="500"
          height="500"
          className="w-full h-full object-cover  "
          priority
        />
        <HeroSectionSearch properties ={data} />
      </div>
    </>
  );
}

export default HeroSection;
