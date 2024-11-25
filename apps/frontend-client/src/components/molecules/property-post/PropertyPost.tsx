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
  { name: "Shop" },
];

const PropertyPost: React.FC<PropertyPostProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [error, setError] = useState<string | null>(null); // State for error handling

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const selected = properties.find((option) => option.name === selectedName);
    if (selected) {
      setSelectedOption(selected);
      setError(null); // Clear the error if a valid option is selected
      onChange(selected); // Trigger the parent's onChange handler
    }
  };

  const validate = () => {
    if (!selectedOption) {
      setError("Please select a property type.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Property type selected:", selectedOption?.name);
      setError(null); // Clear the error on successful submission
    }
  };

  return (
    <div>
      <select
        name="propertyType"
        id="propertyType"
        className={`border-[2px] rounded-lg w-full px-5 py-3 mt-2 mb-4 cursor-pointer ${
          error ? "border-red-500" : "border-gray-400"
        }`}
        value={selectedOption?.name || ""}
        onChange={handleOptionChange}
      >
        <option value="" disabled className="text-gray-300">
          Select a property type
        </option>
        {properties.map((option, index) => (
          <option key={index} value={option.name} className="cursor-pointer">
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-4 py-2"
      >
        Submit
      </button> */}
    </div>
  );
};

export default PropertyPost;
