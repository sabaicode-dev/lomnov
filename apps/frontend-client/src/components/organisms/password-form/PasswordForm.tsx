"use client"
import React, { useState } from "react";

const PasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., validate and send data to the server)
    if (formData.newPassword === formData.confirmPassword) {
      // Proceed with updating the password
    } else {
      // Handle password mismatch error
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-[10px] p-[20px] rounded-[16px] font-helvetica text-helvetica-paragraph text-charcoal max-w-[600px] bg-white border border-pale-gray"
    >
      <div>
        <label className="block mb-[5px] font-bold">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="h-[40px] rounded-[8px] border border-pale-gray w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-[5px] font-bold">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="h-[40px] rounded-[8px] border border-pale-gray w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-[5px] font-bold">Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="h-[40px] rounded-[8px] border border-pale-gray w-full"
          required
        />
      </div>
      <div className="flex justify-end space-x-[10px] pt-[5px]">
        <button
          type="button"
          className="px-[10px] py-[5px] bg-pale-gray rounded-[8px]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-[10px] py-[5px] bg-neutral rounded-[8px]"
        >
          Save Change
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;
