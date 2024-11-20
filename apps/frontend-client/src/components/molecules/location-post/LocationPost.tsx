"use client";

import { useState } from "react";

interface Option {
  name: string;
}

interface LocationPostProps {
  onChange: (option: Option) => void;
}

const locations = [
  { name: "Banteay meanchey" },
  { name: "Battambang" },
  { name: "Kampong cham" },
  { name: "Kampong chhang" },
  { name: "Kampong speu" },
  { name: "Kampong thom" },
  { name: "Kampot" },
  { name: "Kandal" },
  { name: "Kep" },
  { name: "Koh kong" },
  { name: "Kratié" },
  { name: "Mondulkiri" },
  { name: "Oddar Meanchey" },
  { name: "Pailin" },
  { name: "Phnom penh" },
  { name: "Preah Sihanouk" },
  { name: "Preah Vihear" },
  { name: "Prey Veng" },
  { name: "Pursat" },
  { name: "Siem reap" },
  { name: "Stung treng" },
  { name: "Svay rieng" },
  { name: "Takéo" },
  { name: "Tboung khmum" },
];

const LocationPost: React.FC<LocationPostProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const selected = locations.find(option => option.name === selectedName);
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
        className="border-[2px] border-gray-400 rounded-lg px-5 py-3 mt-2 mb-4 w-[97%]"
        value={selectedOption?.name || ""}
        onChange={handleOptionChange}
      >
        <option value="" disabled>
          Select a location
        </option>
        {locations.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationPost;
