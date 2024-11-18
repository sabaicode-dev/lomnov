import ItemCardList from "@/components/molecules/item-card-list/ItemCardList";
import Image from "next/image";
import banner from "@/images/banner.png";
import Search from "@/components/molecules/Search/Search";
import { PropertyProvider } from "@/context/property";
import PropertyList from "@/components/molecules/item-card-list/ItemCardList";
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
          <h1>Find Your Perfect Property</h1>
        </div>

        {/* Line */}
        <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[462px] h-px bg-white"></div>

     
        <div className=" absolute w-full lg:bottom-[-40px] bottom-[-60px] px-2 lg:px-0">
          <div className="  m-auto lg:w-fit  bg-white rounded-[18px]  lg:flex   grid grid-cols-2 lg:grid-cols-4 items-center gap-5 p-5 ">

           <Search/>

          </div>
        </div>
      </header>

      <div className="w-full lg:w-[1300px] m-auto  mt-32 px-2 lg:px-0">
      <PropertyProvider>
        <PropertyList /> {/* Any component that uses useProperties */}
    </PropertyProvider>
      </div>
    </main>
  );
}

export default page;

//**! Old */
//<>
/* <Header />
      <main>
        <div className=" py-5 px-3 lg:px-0 lg:w-[1300px] m-auto mt-5">
          <div className="flex flex-row gap-5 w-full mb-20">
            <div className="w-[50%]  rounded-md overflow-hidden flex flex-row items-center gap-5 border-[1px] border-black  ">
              <input
                type="text"
                className="h-full outline-none px-5 py-3 w-[90%] bg-transparent"
                placeholder="Enter an address..."
              />
              <div className="border-[0.8px] border-solid  border-black h-[20px] "></div>
              <Location props="text-blue-500 text-[18px]" />
            </div>
            <div className="w-[16.66%]">
              <select
                name=""
                id=""
                className=" border-[1px] border-black rounded-lg w-full px-5 py-3 "
              >
                <option value=""> Price </option>
              </select>
            </div>
            <div className="w-[16.6%]">
              <select
                name=""
                id=""
                className=" border-[1px] border-black rounded-lg  w-full px-5 py-3"
              >
                <option value=""> Property type </option>
              </select>
            </div>
            <div className="w-[16.6%]">
              <select
                name=""
                id=""
                className=" border-[1px] border-black rounded-lg px-5 py-3 w-full "
              >
                <option value=""> Room </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-[26px] font-[500]">Property in buy</h1>
              <button className=" bg-blue-500 text-white rounded-[25px] px-5 py-1.5">
                Reset
              </button>
            </div>

            <ItemCardList />
          </div>
        </div>
      </main>
      <Footer /> */
//</>
