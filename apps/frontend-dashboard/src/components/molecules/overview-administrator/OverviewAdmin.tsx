"use client";

import React, { useState } from "react";
import InputField from "@/components/atoms/input-field/InputField";
import { CustomerResponseType } from "@/libs/types/api-customers/customer-response";

//=============================================
interface ItemProps {
  item: CustomerResponseType;
}

const OverviewAdministrator = ({ item }: ItemProps) => {
  const [formData, setFormData] = useState(item);

  // Handler for input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-[100%] mt-[40px] p-[24px] bg-[#F3F4F6] rounded-xls">
      <p className="text-[20px] font-[600] mb-[20px]">Overview</p>
      <form className="w-[100%] text-black">
        <div className="w-[100%]">
          {/* Username */}
          <InputField
            label="Username*"
            placeholder="Username"
            value={formData.userName || ""}
            onChange={(e) => handleChange(e, "userName")}
            readOnly
          />
        </div>
        <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px]">
          <div className="w-[100%] block">
            <InputField
              label="FirstName*"
              placeholder="Firstname"
              value={formData.firstName || ""}
              onChange={(e) => handleChange(e, "firstName")}
              readOnly
            />
          </div>
          <div className="w-[100%] block">
            <InputField
              label="LastName*"
              placeholder="Lastname"
              value={formData.lastName || ""}
              onChange={(e) => handleChange(e, "lastName")}
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
              onChange={(e) => handleChange(e, "phoneNumber")}
              readOnly
            />
          </div>
          <div className="w-[100%] mt-[5px]">
            <label>Status*</label>
            <br />
            <div className="flex justify-start gap-[20px] mt-[20px]">
              <div>
                <input
                  type="radio"
                  name="status"
                  checked={item.status === true}
                  readOnly
                />
                Active
              </div>
              <div>
                <input
                  type="radio"
                  name="status"
                  checked={item.status === false}
                  readOnly
                />
                Inactive
              </div>
            </div>
          </div>
          <div className="w-[100%] mt-[5px]">
            <label>Role*</label>
            <br />
            <div className="flex justify-start gap-[20px] mt-[20px]">
              <div>
                <input
                  type="radio"
                  name="role"
                  checked={item.role === "admin"}
                  readOnly
                />
                Admin
              </div>
              <div>
                <input
                  type="radio"
                  name="role"
                  checked={item.role === "user"}
                  readOnly
                />
                User
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OverviewAdministrator;
