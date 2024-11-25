import React, { useState } from "react";

function PropertyPurpose() {
  const [selected, setSelected] = useState<string | null>(null); // Track the selected button
  const [error, setError] = useState<string>(""); // Track error message

  // Handle button click to change the selected state
  const handleButtonClick = (value: string) => {
    setSelected(value);
    setError(""); // Clear the error when an option is selected
  };

  // Handle validation
  const validateSelection = () => {
    if (!selected) {
      setError("Please select a property purpose (Sale, Rent, or Both)!!");
    } else {
      console.log("Selected purpose:", selected);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-5">
        <svg
          className="w-4 h-4 text-gray-800 dark:text-red-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
          />
        </svg>

        <span className="text-lg font-bold text-gray-900">Property For</span>
      </div>

      <div className="flex justify-center items-center font-medium mt-5">
        <button
          onClick={() => handleButtonClick("Sale")}
          className={`text-gray-600 border-[2px] border-gray-400 w-[290px] h-[50px] hover:scale-105 active:scale-100 transition-transform duration-100 rounded-s-lg ${
            selected === "Sale" ? "bg-yellow-600 scale-105 text-white" : "bg-white"
          }`}
        >
          Sale
        </button>
        <button
          onClick={() => handleButtonClick("Rent")}
          className={`text-gray-600 border-[2px] border-gray-400 w-[290px] h-[50px] hover:scale-105 active:scale-100 transition-transform duration-100 ${
            selected === "Rent" ? "bg-yellow-600 scale-105 text-white" : "bg-white"
          }`}
        >
          Rent
        </button>
        <button
          onClick={() => handleButtonClick("Both")}
          className={`text-gray-600 border-[2px] border-gray-400 w-[290px] h-[50px] hover:scale-105 active:scale-100 transition-transform duration-100 rounded-e-lg ${
            selected === "Both" ? "bg-yellow-600 scale-105 text-white" : "bg-white"
          }`}
        >
          Both
        </button>
      </div>

      {error && (
          <p className="mt-2 text-red-500 text-sm flex justify-center">{error}</p>

      )}

      {/* Validate Button */}
      <div className="flex justify-end mt-5">
        {/* <button
          onClick={validateSelection}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Validate Selection
        </button> */}
      </div>
    </div>
  );
}

export default PropertyPurpose;
