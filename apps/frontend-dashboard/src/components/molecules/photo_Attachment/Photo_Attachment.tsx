"use client";
import React from 'react'
import { useState, ChangeEvent } from "react";

import { TiDeleteOutline } from "react-icons/ti";


const Photo_Attachment = () => {
    const [images, setImages] = useState<string[]>([]);
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
  )
}

export default Photo_Attachment;