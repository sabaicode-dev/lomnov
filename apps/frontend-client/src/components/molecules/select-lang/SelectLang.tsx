import { useState } from 'react';

interface Option {
  label: string;
  imgSrc: string;
}

interface CustomDropdownProps {
  options: Option[];
  defaultOption: Option;
}

const SelectLang : React.FC<CustomDropdownProps> = ({ options, defaultOption }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(defaultOption);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-64">
      <button
        className="flex items-center justify-between w-full px-4 py-2  "
        onClick={toggleDropdown}
      >
        {selectedOption ? (
          <div className="flex items-center">
            <img src={selectedOption.imgSrc} alt={selectedOption.label} className="w-5 h-5 mr-2" />
            <span className='text-white'>{selectedOption.label}</span>
          </div>
        ) : (
          'Select an option'
        )}
        <svg
          className={`w-5 h-5 ml-2 transition-transform transform text-white ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-2  rounded-md shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              <img src={option.imgSrc} alt={option.label} className="w-5 h-5 mr-2" />
              <span className='text-white'>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectLang ;
