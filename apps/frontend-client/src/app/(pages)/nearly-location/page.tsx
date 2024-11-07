import ItemCardList from "@/components/molecules/item-card-list/ItemCardList";
import Image from "next/image";
import banner from "@/images/banner.png";
import SelectProperties from "@/components/molecules/select-properties/SelectProperties";
import SelectPrice from "@/components/molecules/select-price/SelectPrice";
import SelectLocations from "@/components/molecules/select-locations/SelectLocations";
import Search from "@/components/molecules/Search/Search";
import ItemCardNearlyLocationList from "@/components/molecules/item-card-nearly-location-list/ItemCardNearlyLocationList";
import LocationAccess from "@/components/organisms/location-access/LocationAccess";
import banner1 from "@/images/banner1.jpg";
// ===================================================================
function page() {
  return (
    //* New */
    <main className="w-full ">
      {/* Banner */}
      <header className="relative w-full h-[400px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />

        <div className=" absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>

        {/* Title */}
        <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
          <h1>Find Your Perfect Property Nearly your Location</h1>
        </div>

        {/* Line */}
        <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[462px] h-px bg-white"></div>

        {/* Description */}
        <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[85px] font-helvetica text-sm md:text-base lg:text-helvetica-paragraph text-white">
          <p>Find Your Best</p>
        </div>
        <div className=" absolute w-full lg:bottom-[-40px] bottom-[-60px] px-2 lg:px-0">
          <div className="  z-10  m-auto lg:w-fit  bg-white rounded-[18px]  lg:flex   grid grid-cols-2 lg:grid-cols-4 items-center gap-5 p-5 ">

           <Search/>

          </div>
        </div>
      </header>

      {/* Accesslocaion if user block on Homepage */}
      <LocationAccess />



      <div className="w-full lg:w-[1300px] m-auto  mt-32 px-2 lg:px-0">
        <ItemCardList />
      </div>
    </main>
  );
}

export default page;

