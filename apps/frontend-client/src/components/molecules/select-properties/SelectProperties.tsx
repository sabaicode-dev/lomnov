// "use client";
// import Home from "@/icons/Home";
// import { useState } from "react";

// interface Option {
//   name: string;
// }

// interface CustomDropdownProps {
//   options: Option[];
//   defaultOption: Option;
// }

// const properties = [
//   {
//     name: "villar",
//   },
//   {
//     name: "home",
//   },
//   {
//     name: "shop",
//   },
//   {
//     name: "land",
//   },
// ];

// const defaultOption = { name: "Properties" };

// const SelectProperties: React.FC = () => {
//   const [selectedOption, setSelectedOption] = useState<Option | null>(
//     defaultOption,
//   );
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleOptionClick = (option: Option) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block bg-grayish-white rounded-lg">
//       <button
//         className="flex items-center justify-between w-full px-4 py-2  "
//         onClick={toggleDropdown}
//       >
//         {selectedOption ? (
//           <div className="flex items-center">
//             <Home props="mr-3 text-olive-green" />
//             <span className="text-black text-[14px] lg:mr-20">
//               {selectedOption.name}
//             </span>
//           </div>
//         ) : (
//           "Select an option"
//         )}
//         <svg
//           className={`w-5 h-5 ml-2 transition-transform transform text-olive-green ${isOpen ? "rotate-180" : ""}`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M19 9l-7 7-7-7"
//           ></path>
//         </svg>
//       </button>
//       {isOpen && (
//         <div
//           className={` rounded-md absolute left-0 right-0 z-10 mt-2 overflow-hidden bg-[#E0E0DC] shadow-lg transition-all duration-300 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
//         >
//           {properties.map((option, index) => (
//             <div
//               key={index}
//               className="flex items-center px-4 py-2 cursor-pointer hover:bg-olive-green  "
//               onClick={() => handleOptionClick(option)}
//             >
//               <span className="text-black text-[14px] hover:text-white w-full capitalize">{option.name}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectProperties;

// SelectProperties Component
"use client";
import { Home } from "@/icons";
import { useState } from "react";

export interface Option {
  name: string;
}

interface SelectPropertiesProps {
  onChange: (option: Option) => void;
  backGroundColor?:"bg-white" | "bg-grayish-white";
}

const properties = [
  { name: "land" },
  { name: "villa" },
  { name: "home" },
  { name: "shop" },
 
];
const defaultOption = { name: "Properties" };

const SelectProperties: React.FC<SelectPropertiesProps> = ({ onChange,backGroundColor="bg-grayish-white" }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    defaultOption,
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className={`relative inline-block  rounded-lg ${backGroundColor}`}>
      <button
        className="flex items-center justify-between w-full px-4 py-2"
        onClick={toggleDropdown}
      >
        {selectedOption ? (
          <div className="flex items-center ">
            <Home props="mr-3 text-olive-green" />
            <span className="text-black text-[14px] lg:mr-20 ">
              {selectedOption.name}
            </span>
          </div>
        ) : (
          "Select an option"
        )}
        <svg
          className={`w-5 h-5  ml-2 transition-transform transform text-olive-green ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          className={` rounded-md z-10 absolute left-0 right-0  mt-2 bg-[#E0E0DC] shadow-lg transition-all duration-300 ${isOpen ? "max-h-screen opacity-100 overflow-hidden p-2  " : "max-h-0 opacity-0 "}`}
        >
          {properties.map((option, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-olive-green rounded-md z-10"
              onClick={() => handleOptionClick(option)}
            >
              <span className="text-black text-[14px] hover:text-white w-full capitalize">
                {option.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectProperties;
