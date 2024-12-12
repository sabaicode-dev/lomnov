"use client";
import React from "react";
import { useState, ChangeEvent } from "react";
import { TbPhoto } from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { FiItalic } from "react-icons/fi";
import { FiUnderline } from "react-icons/fi";
import { FaStrikethrough } from "react-icons/fa6";
import { FiBold } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
//=============================================
const OverviewProperty = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const toggleStatus = () => {
    setIsPublic(!isPublic);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]); // Type-safe now
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  return (
    <div>
      {/*Over view*/}
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <div className="w-[100%] mt-[40px] p-[24px] bg-[#F3F4F6] rounded-xls">
            <p className="text-[20px] font-[600]">Overview</p>
            <form className="w-[100%] text-Black">
              <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px]">
                <div className="w-[100%] block">
                  <label>Property Title*</label>
                  <input
                    type="text"
                    placeholder="Property title"
                    className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] text-[14px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  />
                </div>

                <div className="w-[100%] mt-[5px] text-[14px]">
                  <label>Slug*</label>
                  <input
                    type="text"
                    placeholder="Property Slug"
                    className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] text-[14px]  bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  />
                </div>
              </div>
              <div className="w-[100%]  mt-[20px] text-[14px]">
                <label className="block  font-medium text-Black mb-[4px] text-[14px]">
                  Description
                </label>
                <div className="border rounded-xls border-gray-300 shadow-sm w-[100%]">
                  <div className="flex items-center space-x-4 p-2 bg-gray-100 border-b border-gray-300">
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <FiBold />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <FaStrikethrough />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <FiUnderline />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <FiItalic />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <FaLink />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <MdFormatListBulleted />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <TbPhoto />
                    </button>
                  </div>
                  <textarea
                    placeholder="Type your description here..."
                    className="w-full h-[150px] p-2 border-0 outline-none text-[14px] bg-BgSoftWhite rounded-xls focus:ring-0"
                  />
                </div>
              </div>
              <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px] text-[14px]">
                <div className="w-[100%] block">
                  <label>Category*</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  >
                    <option value="home">Home</option>
                    <option value="villa">Villa</option>
                    <option value="land">Land</option>
                    <option value="shop">Shop</option>
                  </select>
                </div>

                <div className="w-[100%] block text-[14px]">
                  <label>Transition*</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  >
                    <option value="For Buy">Buy</option>
                    <option value="For Rent">Rent</option>
                  </select>
                </div>
              </div>
              <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px] text-[14px]">
                <div className="w-[100%] block">
                  <label>Price*</label>
                  <input
                    type="number"
                    placeholder="Your price"
                    className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  />
                </div>

                <div className="w-[100%] block text-[14px]">
                  <label>Location*</label>
                  <select
                    name="role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-Black w-[100%] h-[40px] rounded-xls text-[14px] p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                  >
                    <option value="phnom penh">Phnom Penh</option>
                    <option value="kom pongcham">Kom PongCham</option>
                    <option value="Svay Reng">Svay Reng</option>
                    <option value="kep">Kep</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          {/*List Detail*/}
          <div className="w-[100%] mt-[20px]">
            <div className="w-[100%] mt-[20px] p-[24px] bg-[#F3F4F6] rounded-xls">
              <p className="text-[20px] font-[600]">List Detail</p>
              <form className="w-[100%] mt-[20px] text-[14px]">
                <div className="w-[100%] grid gap-4 grid-cols-2 mt-[20px]">
                  <div className="w-[100%] block">
                    <label>Bedrooms</label>
                    <input
                      type="number"
                      placeholder="Bedrooms"
                      className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                    />
                  </div>
                  <div className="w-[100%] block">
                    <label>Bathrooms</label>
                    <input
                      type="number"
                      placeholder="Bathrooms"
                      className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                    />
                  </div>
                  <div className="w-[100%] mt-[5px]">
                    <label>Spacious life (m2)</label>
                    <input
                      type="number"
                      placeholder="Spacious life"
                      className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px] focus:outline-none focus:border-Primary/20"
                    />
                  </div>
                  <div className="w-[100%] mt-[5px]">
                    <label>Parking available</label>
                    <input
                      type="number"
                      placeholder="Parking available"
                      className="text-Black w-[100%] h-[40px] rounded-xls p-[10px]  bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px]  focus:outline-none focus:border-Primary/20"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/*Up load image*/}
          <div className="w-[100%] mt-[20px] p-[24px] bg-[#F3F4F6] rounded-xls">
            <p className="text-[20px] font-[600]">Photo Attachment</p>
            <div className="w-[100%] border-BgSoftWhite ">
            

              <label
                htmlFor="multi-file-upload"
                className="flex flex-col items-center"
              >
              
                <span className="text-Black w-[100%] text-center text-[14px] mb-[20px] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[20px] focus:outline-none focus:border-Primary/20">
                  Click to upload or drag and  <span className="text-Primary">drop</span>
                </span>
                <input
                  id="multi-file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <div className="flex justify-center items-center gap-[20px]">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative border rounded-md overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="object-cover w-[80px] h-[80px] rounded-xls"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 text-Negative text-[20px]"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*status*/}
        <div className="w-[30%] mt-[40px] text-[14px]">
          <div className=" p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">Status</h2>
            <div className="mt-4 flex items-center space-x-3">
              <button
                onClick={toggleStatus}
                className={`w-10 h-6 flex items-center rounded-full p-1 ${
                  isPublic ? "bg-Primary" : "bg-gray-200"
                } transition-colors`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                    isPublic ? "translate-x-4" : "translate-x-0"
                  }`}
                ></div>
              </button>
              <span className="text-sm font-medium text-gray-700">
                {isPublic ? "Public" : "Private"}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {isPublic
                ? "This product is visible on all sales channels."
                : "This product will be hidden from all sales channels."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewProperty;
