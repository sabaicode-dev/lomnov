// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import Search from "@/components/organisms/search/Search";
// import { LuFilter } from "react-icons/lu";
// interface IFromDataListProperty {
//   liveSearch: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
// }
// const FromDataListProperty = ({ liveSearch,onChange}: IFromDataListProperty) => {
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("");
//   const filterRef = useRef<HTMLDivElement>(null)

//   //Toggle filter popup
//     const handleFilterClick = () => {
//       setIsPopupVisible((prev) => !prev);
//     }
  
//     //Close popup when clicking outside
//     useEffect(() => {
//       const handleClickOutside = (event: MouseEvent) => {
//         if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
//           setIsPopupVisible(false);
//         }
//       };
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//   return (
//     <div className="w-[100%] h-auto bg-BgSoftWhite mt-[40px] rounded-tr-lg rounded-tl-lg">
//       <div className="flex justify-between p-[20px] items-center">
//         <p className="inter text-[20px] font-simple ">Property List</p>
//         <Link href={"/dashboard/add-new-property"}>
//           <button className="bg-Primary py-[8px] px-[16px] rounded-sm text-[16px] text-BgSoftWhite">
//             +New Property
//           </button>
//         </Link>
//       </div>
//       <div className="bg-Primary/10 w-[100%] flex justify-end gap-[10px] p-[10px] items-center relative">
//         <Search liveSearch={liveSearch} onChange={onChange}/>
//         <div 
//           className="bg-BgSoftWhite rounded-sm w-[40px] h-[40px] flex items-center justify-center"
//           onClick={handleFilterClick}
//           ref={filterRef}
//         >
//           <LuFilter className="w-[20px] h-[18px] text-Primary" />
//         </div>

//         {/* Filter Popup */}
//         {isPopupVisible && (
//           <div
//             className="absolute top-[60px] right-[0px] w-[400px] bg-BgSoftWhite rounded-xl shadow-lg p-4 z-50"
//             ref={filterRef}
//           >
//             <p className="text-[16px] font-[600] mb-[20px]">Filters</p>
//             <form className="space-y-4">
//               <div>
//               <label>Transition*</label>
//                   <select
//                     value={selectedRole}
//                     onChange={(e) => setSelectedRole(e.target.value)}
//                     className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
//                   >
//                     <option value="">Select transition</option>
//                     <option value="For Sale">Sale</option>
//                     <option value="For Rent">Rent</option>
//                   </select>
//               </div>
//               <div>
//               <label>Location*</label>
//                   <select
//                     name="role"
//                     value={selectedRole}
//                     onChange={(e) => setSelectedRole(e.target.value)}
//                     className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
//                   >
//                     <option value="">Your city/province</option>
//                     <option value="phnom penh">Phnom Penh</option>
//                     <option value="kom pongcham">Kom PongCham</option>
//                     <option value="Svay Reng">Svay Reng</option>
//                     <option value="kep">Kep</option>
//                   </select>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Table Headers */}
//       <div className="w-[100%] p-[12px] text-[14px] text-Black font-DM Sans flex justify-between ">
//         <div className="flex justify-start gap-[40px] w-[20%] ">
//           <p>#</p>
//           <p>Properties Photo & Name</p>
//         </div>
//         <div className="flex justify-between items-center ml-[93px] w-[87%] ">
//           <div className="w-[200px] flex justify-start ">
     
//             <p>Sale/Rent</p>
//           </div>
//           <div className="w-[200px] flex justify-startm-2">
//             <p>Categories</p>
//           </div>
//           <div className="w-[200px] flex justify-start">
//             <p>Location</p>
//           </div>
//           <div className="w-[200px] flex justify-start ">
//             <p>Price</p>
//           </div>
//           <div  className="w-[200px] flex justify-start">
//              <p>Status</p>
//           </div>
//         </div>
//         <div className="w-[9%]"></div>
//       </div>
//     </div>
//   );
// };

// export default FromDataListProperty;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Search from "@/components/organisms/search/Search";
import PropertyFilterPopup from "@/components/atoms/property-filter-popup/PropertyFilterPopup";
import { LuFilter } from "react-icons/lu";

//====================
interface IFromDataListProperty {
  liveSearch: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FromDataListProperty = ({ liveSearch, onChange }: IFromDataListProperty) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedTransition, setSelectedTransition] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleFilterClick = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="w-[100%] h-auto bg-BgSoftWhite mt-[40px] rounded-tr-lg rounded-tl-lg relative">
      <div className="flex justify-between p-[20px] items-center">
        <p className="inter text-[20px] font-simple">Properties List</p>
        <Link href={"/dashboard/add-new-property"}>
          <button className="bg-Primary py-[8px] px-[16px] rounded-sm text-[16px] text-BgSoftWhite">
            + New Property
          </button>
        </Link>
      </div>
      <div className="bg-Primary/10 w-[100%] flex justify-end gap-[10px] p-[10px] items-center relative">
        <Search liveSearch={liveSearch} onChange={onChange} />
        <div
          className="bg-BgSoftWhite rounded-sm w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
          onClick={handleFilterClick}
        >
          <LuFilter className="w-[20px] h-[18px] text-Primary" />
        </div>
        
        {/* Import PropertyFilterPopup Component */}
        <PropertyFilterPopup
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          selectedTransition={selectedTransition}
          setSelectedTransition={setSelectedTransition}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>

      {/* Table Headers */}
      <div className="w-[100%] p-[12px] text-[14px] text-Black font-DM Sans flex justify-between">
        <div className="flex justify-start gap-[40px] w-[20%]">
          <p>#</p>
          <p>Properties Photo & Name</p>
        </div>
        <div className="flex justify-between items-center ml-[93px] w-[87%]">
          <div className="w-[200px] flex justify-start">
            <p>Sale/Rent</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>Categories</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>Location</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>Price</p>
          </div>
          <div className="w-[200px] flex justify-start">
            <p>Status</p>
          </div>
        </div>
        <div className="w-[9%]"></div>
      </div>
    </div>
  );
};

export default FromDataListProperty;
