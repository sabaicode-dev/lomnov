import ItemCardList from "@/components/molecules/item-card-list/ItemCardList";
import Image from "next/image";
import banner from "@/images/banner.png";
import SelectProperties from "@/components/molecules/select-properties/SelectProperties";
const options = [
  { label: "English", imgSrc: "/path/to/image1.jpg" },
  { label: "Khmer", imgSrc: "/path/to/image2.jpg" },
  // Add more options as needed
];
const defaultOption = { label: "Properties", imgSrc: "" };
function page() {
  return (
    <main>
      {/* Banner */}
      <header className="relative w-full h-[400px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75  left-0"
        />

        <div className=" absolute left-0 top-0 w-full h-full bg-[#0000004e]">
          {" "}
        </div>

        {/* Title */}
        <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
          <h1>Find Your Perfect Property</h1>
        </div>

        {/* Line */}
        <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[462px] h-px bg-white"></div>

        {/* Description */}
        <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[85px] font-helvetica text-sm md:text-base lg:text-helvetica-paragraph text-white">
          <p>Customize your search below.</p>
        </div>
        <div className=" absolute w-full lg:bottom-[-40px] bottom-[-60px] px-2 lg:px-0">
          <div className="  z-10  m-auto lg:w-fit  bg-white rounded-[18px]  lg:flex   grid grid-cols-2 lg:grid-cols-4 items-center gap-5 p-5 ">
            <SelectProperties options={options} defaultOption={defaultOption} />
            <SelectProperties options={options} defaultOption={defaultOption} />
            <SelectProperties options={options} defaultOption={defaultOption} />
            <button className=" bg-neutral text-white font-[600] px-5 py-2 rounded-md lg:w-[120px]">
              Search
            </button>
          </div>
        </div>
      </header>

      <div className="w-full lg:w-[1300px] m-auto  mt-32 px-2 lg:px-0">
        <ItemCardList />
      </div>
    </main>
  );
}

export default page;

// <div className="flex flex-row gap-5 w-full mb-20">
//   <div className="w-[50%]  rounded-md overflow-hidden flex flex-row items-center gap-5 border-[1px] border-black  ">
//     <input
//       type="text"
//       className="h-full outline-none px-5 py-3 w-[90%] bg-transparent"
//       placeholder="Enter an address..."
//     />
//     <div className="border-[0.8px] border-solid  border-black h-[20px] "></div>
//     <Location props="text-blue-500 text-[18px]" />
//   </div>
//   <div className="w-[16.66%]">
//     <select
//       name=""
//       id=""
//       className=" border-[1px] border-black rounded-lg w-full px-5 py-3 "
//     >
//       <option value=""> Price </option>
//     </select>
//   </div>
//   <div className="w-[16.6%]">
//     <select
//       name=""
//       id=""
//       className=" border-[1px] border-black rounded-lg  w-full px-5 py-3"
//     >
//       <option value=""> Property type </option>
//     </select>
//   </div>
//   <div className="w-[16.6%]">
//     <select
//       name=""
//       id=""
//       className=" border-[1px] border-black rounded-lg px-5 py-3 w-full "
//     >
//       <option value=""> Room </option>
//     </select>
//   </div>
// </div>
