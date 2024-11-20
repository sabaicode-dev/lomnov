import React, { useState } from "react";
import PropertyPost from "@/components/molecules/property-post/PropertyPost";
import PropertyPurpose from "@/components/molecules/property-purpose/PropertyPurpose";

function Page() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  // Handle property type change
  const handlePropertyChange = (option: { name: string }) => {
    setSelectedProperty(option.name);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // Prevent form from refreshing the page

    // Simple validation
    if (!formData.title || !formData.description) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!selectedProperty) {
      setError("Please select a property type.");
      return;
    }

    // Clear error if validation is successful
    setError(null);

    // Proceed with form submission logic (e.g., send data to API)
    alert("Form submitted successfully!");
    console.log(formData);
  };

  return (
    <div className="h-full mt-[150px] bg-[#F6F6F6]">
      <div className="ms-[130px] me-[130px]">
        {/* Property Purpose */}
        <PropertyPurpose />

        {/* Line */}
        <div className="mt-10 w-full h-px bg-black"></div>

        <div className="mt-10 flex items-center space-x-3">
          <svg
            className="w-4 h-4 text-gray-800"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5">
          {/* Title Input */}
          <div className="mt-5 ms-10">
            <label className="font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your title"
              className="border-[2px] border-gray-400 rounded-lg w-[100%] px-5 py-3 mt-2"
            />
          </div>

          {/* Description Input */}
          <div className="mt-5 ms-10">
            <label className="font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter your description"
              className="border-[2px] border-gray-400 rounded-lg w-[100%] px-5 py-3 mt-2"
            />
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 mt-2">{error}</div>}

          {/* Property Type */}
          <div className="mt-10 ms-10">
            <PropertyPost onChange={handlePropertyChange} />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
