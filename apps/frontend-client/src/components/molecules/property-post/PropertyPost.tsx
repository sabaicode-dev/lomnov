"use client";

import { useState } from "react";

interface Option {
  name: string;
}

interface PropertyPostProps {
  onChange: (option: Option) => void;
}

const properties = [
  { name: "House" },
  { name: "Land" },
  { name: "Villa" },
  { name: "Shop" }
];

const PropertyPost: React.FC<PropertyPostProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const selected = properties.find(option => option.name === selectedName);
    if (selected) {
      setSelectedOption(selected);
      onChange(selected);  // Trigger the parent's onChange handler
    }
  };

  return (
    <div>
      <select
        name="location"
        id="location"
        className="border-[2px] border-gray-400 text-gray-400 rounded-lg w-full px-5 py-3 mt-2 mb-4"
        value={selectedOption?.name || ""}
        onChange={handleOptionChange}
      >
        <option value="" disabled >
          Select a property type
        </option>
        {properties.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PropertyPost;
