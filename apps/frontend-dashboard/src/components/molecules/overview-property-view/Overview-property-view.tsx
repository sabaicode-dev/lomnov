
"use client";
// export default OverviewProperty;
import React, { useState } from "react";
import { TbPhoto } from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";
import { FaLink, FaStrikethrough } from "react-icons/fa6";
import { FiItalic, FiBold, FiUnderline } from "react-icons/fi";
import { IResponseComparePropertes } from "@/libs/types/api-properties/property-response";

interface ItemProps {
  item: IResponseComparePropertes;
}

// =============================================
const OverviewProperty = ({ item }: ItemProps) => {
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
    <div>

      {/* Overview */}
      <div className="w-full flex justify-between gap-5">
        <div className="w-full">
          <div className="w-full mt-10 p-6 bg-gray-100 rounded-lg">
            <p className="text-xl font-semibold">Overview</p>
            <form className="w-full text-black">
              <div className="grid gap-4 grid-cols-2 mt-5">
                {/* Property Title */}
                <InputField
                  label="Property Title*"
                  placeholder="Property title"
                  value={formData.title?.[0]?.content || ""}
                  onChange={(e) => handleChange(e, "title")}
                  readOnly
                />

                {/* */}
                <InputField
                  label="Slug*"
                  placeholder="Property slug"

                  value={formData.slug || ""}
                  onChange={(e) => handleChange(e, "slug")}
                />
              </div>

              {/* Description */}
              <div className="mt-5">
                <label className="block font-medium mb-1 text-sm">Description</label>
                <div className="border rounded-lg border-gray-300 shadow-sm">
                  <div className="flex items-center space-x-4 p-2 bg-gray-100 border-b border-gray-300">
                    <IconButton Icon={FiBold} />
                    <IconButton Icon={FaStrikethrough} />
                    <IconButton Icon={FiUnderline} />
                    <IconButton Icon={FiItalic} />
                    <IconButton Icon={FaLink} />
                    <IconButton Icon={MdFormatListBulleted} />
                    <IconButton Icon={TbPhoto} />
                  </div>
                  <textarea
                    placeholder="Type your description here..."
                    value={formData.description?.[0]?.content || ""}
                    readOnly
                    onChange={(e) => handleChange(e, "description")}
                    className="w-full h-40 p-2 border-0 outline-none text-sm bg-gray-50 rounded-lg focus:ring-0"
                  />
                </div>
              </div>

              {/* Category and Transition */}
              <div className="grid gap-4 grid-cols-2 mt-5">

                <InputField
                  label="Category*"
                  value={formData.category?.[0]?.content || ""}
                  readOnly
                  onChange={(e) => handleChange(e, "category")}
                />
                <InputField
                  label="Transition*"
                  value={formData.transition?.[0]?.content || ""}
                  readOnly
                  onChange={(e) => handleChange(e, "transition")}
                />
              </div>

              {/* Price and Location */}
              <div className="grid gap-4 grid-cols-2 mt-5">
                <InputField
                  label="Price*"
                  placeholder="Your price"
                  value={formData.price || ""}
                  readOnly
                  onChange={(e) => handleChange(e, "price")}
                />
                <InputField
                  label="Location*"
                  value={formData.location?.[0]?.content || ""}
                  readOnly
                  onChange={(e) => handleChange(e, "location")}
                />
              </div>
            </form>
          </div>

          {/* List Detail */}
          <div className="w-full mt-5">
            <div className="w-full p-6 bg-gray-100 rounded-lg">
              <p className="text-xl font-semibold">List Detail</p>
              <form className="w-full mt-5">
                <div className="grid gap-4 grid-cols-2">
                  <InputField
                    label="Bedrooms"
                    placeholder="Bedrooms"
                    value={formData.detail?.[0]?.bedrooms || "empty"}
                    onChange={(e) => handleChange(e, "detail.bedrooms")}
                    readOnly
                  />
                  <InputField
                    label="Bathrooms"
                    placeholder="Bathrooms"
                    value={formData.detail?.[0]?.bathrooms || "empty"}
                    onChange={(e) => handleChange(e, "detail.bathrooms")}
                    readOnly
                  />
                  <InputField
                    label="Spacious life (m2)"
                    placeholder="Spacious life"
                    value={formData.detail?.[0]?.land_size || "empty"}
                    onChange={(e) => handleChange(e, "detail.land_size")}
                    readOnly
                  />
                  <InputField
                    label="Parking available"
                    placeholder="Parking available"
                    value={formData.detail?.[0]?.parking || "empty"}
                    onChange={(e) => handleChange(e, "detail.parking")}
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable InputField Component
const InputField = ({ label, placeholder, value, onChange }: any) => (
  <div className="w-full">
    <label className="block text-sm font-medium">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly
      className="w-full h-10 p-2 mt-1 text-sm rounded-lg bg-gray-50 border border-gray-300 focus:outline-none"
    />
  </div>
);

// Reusable IconButton Component
const IconButton = ({ Icon }: { Icon: React.ElementType }) => (
  <button type="button" className="p-1 text-gray-500 hover:text-gray-700">
    <Icon />
  </button>
);

export default OverviewProperty;
