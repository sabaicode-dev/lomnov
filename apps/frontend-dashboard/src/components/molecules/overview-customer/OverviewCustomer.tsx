"use client";

import React, { useState } from "react";
import InputField from "@/components/atoms/input-field/InputField";
import { CustomerResponseType } from "@/libs/types/api-customers/customer-response";

//=============================================
interface itemProps {
  item: CustomerResponseType;
}

const OverviewCustomer = ({ item }: itemProps) => {
  const [formData, setFormData] = useState(item);
  // Handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-[100%] mt-[40px] p-[24px] bg-[#F3F4F6] rounded-xls">
      <p className="text-[20px] font-[600] mb-[20px]">Overview</p>
      <form className="w-[100%] text-Black">

        <div className="w-[100%]">
          {/* Username */}
          <InputField
            label="Username*"
            placeholder="Username"
            value={formData.userName || ""}
            onChange={(e) => handleChange(e, "username")}
            readOnly
          />
        </div>
        <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px]">
          <div className="w-[100%] block">
            <InputField
              label="FirstName*"
              placeholder="Firstname"
              value={formData.firstName || ""}
              onChange={(e) => handleChange(e, "firstname")}
              readOnly
            />
          </div>
          <div className="w-[100%] block">
            <InputField
              label="LasrName*"
              placeholder="Lastname"
              value={formData.lastName || ""}
              onChange={(e) => handleChange(e, "lastname")}
              readOnly
            />
          </div>
          <div className="w-[100%] mt-[5px]">
            <InputField
              label="Email*"
              placeholder="Email"
              value={formData.email || ""}
              onChange={(e) => handleChange(e, "email")}
              readOnly
            />
          </div>
          <div className="w-[100%] mt-[5px]">
            <InputField
              label="Contact*"
              placeholder="Phone Number"
              value={formData.phoneNumber || ""}
              onChange={(e) => handleChange(e, "phonenumber")}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
};


export default OverviewCustomer;