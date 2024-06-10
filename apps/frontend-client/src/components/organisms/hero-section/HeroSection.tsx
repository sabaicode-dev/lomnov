import HeroSectionSearch from "@/components/molecules/hero-section-serch/HeroSectionSearch";
import Image from "next/image";

interface RealEstateDetail {
  land_size: string;
  total_land_size: string;
  building_size: string;
  total_building_size: string;
  road_size: string;
  bed_room: number;
  bath_room: number;
  living_room: number;
  kitchen: number;
  parking: number;
  garden: string;
  swimming_pool: string;
}

interface RealEstateItem {
  id: number;
  user: string;
  transaction: string;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  detail: RealEstateDetail;
  address: string;
  mapurl: string;
  favorite: boolean;
  status: boolean;
  lang: string;
}
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
      <div className="w-full h-[250px] md:h-[300px]  lg:h-[350px] bg-blue-500 relative ">
        <Image
          src={"https://wallpapercave.com/wp/wp4110653.jpg"}
          alt=""
          width="500"
          height="500"
          className="w-full h-full object-cover  "
        />
        <HeroSectionSearch properties ={ data} />

      </div>
    </>
  );
}

export default HeroSection;
