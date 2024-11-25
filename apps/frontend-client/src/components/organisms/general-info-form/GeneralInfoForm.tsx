"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/libs/types/user-types/user";

const GeneralInfoForm = ({ user }: { user: User }) => {
  const initialFormData = {
    username: user.userName,
    firstname: user.firstName,
    lastname: user.lastName,
    email: user.email,
    location: user.location,
    address: user.address,
    phone: user.phoneNumber,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isChanged, setIsChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Add loading state

  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(initialFormData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true); // Start loading
    console.log("Form submitted:", formData);

    // Simulate saving process
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulates a 2-second delay

    setIsSaving(false); // End loading
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-[10px] mt-10 p-[20px] rounded-[16px] font-helvetica text-helvetica-paragraph text-charcoal max-w-[600px] bg-white border border-pale-gray"
    >
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block mb-[5px] font-bold capitalize">{key}</label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            className="h-[40px] rounded-[8px] border border-pale-gray w-full"
          />
        </div>
      ))}
      <div className="flex justify-end space-x-[10px] pt-[5px]">
        <button
          type="button"
          onClick={handleCancel}
          className={`mr-[10px] py-[5px] border-b-2 border-black ${
            isChanged
              ? "hover:text-neutral text-black hover:border-neutral"
              : "text-gray-400 border-b-2 border-gray-400 cursor-not-allowed"
          }`}
          disabled={!isChanged}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-[10px] py-[5px] rounded-[8px] ${
            isChanged
              ? "hover:bg-neutral bg-olive-drab text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isChanged || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"} {/* Update button text */}
        </button>
      </div>
    </form>
  );
};

export default GeneralInfoForm;
