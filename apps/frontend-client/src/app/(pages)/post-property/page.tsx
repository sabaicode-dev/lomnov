"use client";

import React, { useState } from "react";
import PropertyPost from "@/components/molecules/property-post/PropertyPost";
import InformationProperty from "@/components/molecules/information-property/InformationProperty";
import LocationProperty from "@/components/molecules/location-property/LocationProperty";
import PropertyPurpose from "@/components/molecules/property-purpose/PropertyPurpose";

function Page() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const [showPopup, setShowPopup] = useState<boolean>(false); // State for the popup
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleErrorMessage = () => {
    setErrorMessage("An error occurred.");
    return errorMessage;
  };

  const handlePropertyChange = (option: { name: string }) => {
    setSelectedProperty(option.name);
  };

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted successfully.");
      setErrors({});
    }else if(handleErrorMessage() === null){
      console.log("An error occurred.");
      setErrorMessage(null);
    }
     else {
      console.log("Validation failed.");
    }
  };

  const handleClearAll = () => {
    setTitle("");
    setDescription("");
    setSelectedProperty(null);
    setErrors({});
    setShowPopup(false); // Close the popup after clearing
  };

  return (
    <div className="h-full mt-[150px] bg-[#F6F6F6]">
      <div className="ms-[130px] me-[130px]">
        {/* Property Purpose */}
        <PropertyPurpose />

        {/* Line */}
        <div className="mt-10 left-0 w-full h-px bg-black"></div>

        {/* Overview Section */}
        <div className="mt-10 flex items-center space-x-3">
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
          <span className="text-lg font-bold text-gray-900">Overview</span>
        </div>

        {/* Title Field */}
        <div className="mt-5 ms-10">
          <label className="font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`border-[2px] rounded-lg w-full px-5 py-3 mt-2 ${
              errors.title ? "border-red-500" : "border-gray-400"
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description Field */}
        <div className="mt-5 ms-10">
          <label className="font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`border-[2px] rounded-lg w-full px-5 py-3 mt-2 ${
              errors.description ? "border-red-500" : "border-gray-400"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Line */}
        <hr className="mt-10 w-full h-px border-black" />

        {/* Property Type Section */}
        <div className="mt-10 flex items-center space-x-3">
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
          <span className="text-lg font-medium text-gray-900">Property type</span>
        </div>

        <div className="mt-5 ms-10">
          <label className="font-bold">
            Type: <span className="text-red-500">*</span>
          </label>
          <PropertyPost onChange={handlePropertyChange} />
        </div>

        {/* Line */}
        <div className="mt-10 w-full h-px bg-black"></div>

        <InformationProperty handleErrorMessage={handleErrorMessage} />

                  {/* Line */}
        <hr className="mt-10 w-full h-px border-black" />


        {/* Location Section */}
        <LocationProperty />

        {/* Action Buttons */}
        <div className="flex flex-row justify-end mt-10">
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:scale-105 active:scale-95 transition-transform duration-150"
            onClick={() => setShowPopup(true)} // Show the confirmation popup
          >
            Clear all
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-blue-700 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            Create
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (

        <div className="shadow mx-auto fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
      <div className="flex justify-end p-2">
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 pt-0 text-center">
        <svg
          className="w-20 h-20 text-red-600 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
          Are you sure you want to delete this user?
        </h3>
        <a
          type="submit"
          onClick={() => setShowPopup(false)} // Close the popup
          href="#"
          className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 me-2 text-center hover:scale-105 active:scale-95 transition-transform duration-150"
        >
          No, cancel
        </a>
        <a
          type="submit"
          onClick={handleClearAll} // Clear all inputs
          href="#"
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 hover:scale-105 active:scale-95 transition-transform duration-150"
        >
          Yes, I`m sure
        </a>
      </div>
    </div>
    </div>
      )}
    </div>
  );
}

export default Page;
