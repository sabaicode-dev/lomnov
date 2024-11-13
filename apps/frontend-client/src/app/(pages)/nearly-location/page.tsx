import ItemCardList from "@/components/molecules/item-card-list/ItemCardList";
import Image from "next/image";
import banner from "@/images/banner.png";
import Search from "@/components/molecules/Search/Search";
import LocationAccess from "@/components/organisms/location-access/LocationAccess";
import RecommendedProperties from "@/components/molecules/RecommendedProperties/RecommendedProperties";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import Map from "../../../components/molecules/map/Map";
import axios from "axios";

// Function to fetch property data based on the provided id
async function fetchProperty(id: string): Promise<RealEstateItem | null> {
  try {
    const res = await axios.get(`https://lomnov.onrender.com/api/v1/properties?id=${1}`);
    console.log("Nearly location page:: ",res)
    if (res.status !== 200) {
      throw new Error("Failed to fetch property data");
    }
    const data = await res.data
    return data[0] || null;  // Ensure it returns null if no data found
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

const page = async ({ params }: { params: { id: string } }) => {
  let property: RealEstateItem | null = await fetchProperty(params.id);

  return (
    <div className="w-full">
      {/* Banner */}
      <header className="relative w-full h-[400px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>

        {/* Title */}
        <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
          <h1>Find Your Perfect Property Near Your Location</h1>
        </div>

        {/* Line */}
        <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[462px] h-px bg-white"></div>

        {/* Description */}
        <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[85px] font-helvetica text-sm md:text-base lg:text-helvetica-paragraph text-white">
          <p>Find Your Best</p>
        </div>
        <div className="absolute w-full lg:bottom-[-40px] bottom-[-60px] px-2 lg:px-0">
          <div className="z-10 m-auto lg:w-fit bg-white rounded-[18px] lg:flex grid grid-cols-2 lg:grid-cols-4 items-center gap-5 p-5 ">
            <Search />
          </div>
        </div>
      </header>

      {/* Location Access if user blocked on Homepage */}
      <LocationAccess />

      <div className="w-full lg:w-[1300px] m-auto mt-20 px-2 lg:px-0 text-center text-3xl mb-2 text-[26px] font-[600] text-olive-drab">
        Near your Location
      </div>

      <div className="w-full lg:w-[1300px] m-auto mt-10 px-2 lg:px-0">

          <ItemCardList />
      </div>

      {/* Line */}
      <div className="mt-24 bottom-[130px] w-full h-px bg-black"></div>

      <div className="w-full lg:w-[1300px] m-auto mt-20 px-2 lg:px-0 text-center text-3xl mb-2 text-[26px] font-[600] text-olive-drab">
        Here is your Location
      </div>

      {/* Check if property data is available before rendering Map */}
      <div className="w-full max-w-[1300px] mx-auto mt-10">
        {property ? (
          <div className="w-full h-full">
            {/* Pass map URL to the Map component */}
            <Map property={property.urlmap || ""} />
          </div>
        ) : (
          <p className="text-center">Loading map or property data...</p>
        )}
      </div>

      <div className="w-full lg:w-[1300px] m-auto mt-10 px-2 lg:px-0">
        {property ? (
          <RecommendedProperties
            category={property.category[0].content} // Provide a default value
            address={property.address[0].content} // Provide a default value
          />
        ) : (
          <p className="text-center">Loading recommended properties...</p>
        )}
      </div>
    </div>
  );
};

export default page;
