"use client"
import Home from "@/icons/Home";
import { useState } from "react";

interface Option {
  label: string;
  imgSrc: string;
}

interface CustomDropdownProps {
  options: Option[];
  defaultOption: Option;
}

const SelectProperties: React.FC<CustomDropdownProps> = ({
  options,
  defaultOption,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    defaultOption,
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block bg-grayish-white rounded-lg">
      <button
        className="flex items-center justify-between w-full px-4 py-2  "
        onClick={toggleDropdown}
      >
        {selectedOption ? (
          <div className="flex items-center">
            <Home props="mr-3 text-olive-green"/>
            <span className="text-black text-[14px] lg:mr-20">
              {selectedOption.label}
            </span>
          </div>
        ) : (
          "Select an option"
        )}
        <svg
          className={`w-5 h-5 ml-2 transition-transform transform text-olive-green ${isOpen ? "rotate-180" : ""}`}
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
          className={` rounded-md absolute left-0 right-0 z-10 mt-2 bg-[#E0E0DC] shadow-lg transition-all duration-300 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700  "
              onClick={() => handleOptionClick(option)}
            >
              <span className="text-black text-[14px]">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectProperties;
