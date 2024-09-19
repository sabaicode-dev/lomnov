"use client"
import React, { useState } from "react";
import { User } from "@/libs/types/user-types/user";

const GeneralInfoForm = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState({
    username: user.userName,
    firstname: user.firstName,
    lastname: user.lastName,
    email: user.email,
    location: user.location,
    address: user.address,
    phone: user.phoneNumber,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-[10px] p-[20px] rounded-[16px] font-helvetica text-helvetica-paragraph text-charcoal max-w-[600px] bg-white border border-pale-gray"
    >
      <div>
        <label className="block mb-[5px] font-bold">User name</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="h-[40px] rounded-[8px] border border-pale-gray w-full"
        />
      </div>
      <div>
        <label className="block mb-[5px] font-bold">First name</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className="h-[40px] rounded-[8px] border border-pale-gray w-full"
        />
      </div>
      <div>
        <label className="block mb-[5px] font-bold">Last name</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="h-[40px] rounded-[8px] border border-pale-gray w-full"
        />
      </div>
      <div>
        <label className="block mb-[5px] font-bold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="h-[40px] rounded-[8px] border border-pale-gray w-full"
        />
      </div>
      <div>
        <label className="block mb-[5px] font-bold">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="h-[40px] rounded-[8px] border border-pale-gray w-full"
        />
      </div>
      <div>
        <label className="block mb-[5px] font-bold">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="h-[40px] rounded-[8px] border border-pale-gray w-full"
        />
      </div>
      <div>
        <label className="block mb-[5px] font-bold">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="h-[40px] rounded-[8px] border border-pale-gray w-full"
        />
      </div>
      <div className="flex justify-end space-x-[10px] pt-[5px]">
        <button type="button" className="px-[10px] py-[5px] bg-pale-gray rounded-[8px]">
          Cancel
        </button>
        <button type="submit" className="px-[10px] py-[5px] bg-neutral rounded-[8px]">
          Save Change
        </button>
      </div>
    </form>
  );
};

export default GeneralInfoForm;
