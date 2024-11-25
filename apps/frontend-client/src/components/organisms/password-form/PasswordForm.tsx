"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

const PasswordForm = () => {
  const initialFormData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isChanged, setIsChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 

  // Detect form changes
  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(initialFormData));
  }, [formData]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Reset form data on cancel
  const handleCancel = () => {
    setFormData(initialFormData);
    setErrorMessage(""); 
    setSuccessMessage(""); 
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }
  
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CHANGE_PASSWORD, {
        previousPassword: formData.currentPassword,
        proposedPassword: formData.newPassword,
      });
  
      if (response.status === 200) {
        setSuccessMessage("Password changed successfully.");
        setFormData(initialFormData);
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error || "Failed to change password. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-[10px] mt-10 p-[20px] rounded-[16px] font-helvetica text-helvetica-paragraph text-charcoal max-w-[600px] bg-white border border-pale-gray"
    >
      {/* Show error message */}
      {errorMessage && (
        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
      )}

      {/* Show success message */}
      {successMessage && (
        <div className="text-green-500 text-sm mb-4">{successMessage}</div>
      )}

      {/* Render input fields */}
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block mb-[5px] font-bold capitalize">{key}</label>
          <input
            type="password"
            name={key}
            value={value}
            onChange={handleChange}
            className="h-[40px] rounded-[8px] border border-pale-gray w-full"
            required
          />
        </div>
      ))}

      <div className="flex justify-end space-x-[10px] pt-[5px]">
        {/* Cancel button */}
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

        {/* Save Changes button */}
        <button
          type="submit"
          className={`px-[10px] py-[5px] rounded-[8px] ${
            isChanged
              ? "hover:bg-neutral bg-olive-drab text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isChanged || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;
