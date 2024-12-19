"use client";
import React, { useState } from "react";

//=====================
interface IPhotoAttachmentProps {
  initialImages?: string[];
  defaultProfile: string;
}

const PhotoAttachment = ({ initialImages = [], defaultProfile }: IPhotoAttachmentProps) => {
  const [images, setImages] = useState<string[]>(initialImages);

  return (
    <div>
      <div className="w-[100%] mt-[20px] p-[24px] bg-[#F3F4F6] rounded-xls">
        <p className="text-[20px] font-[600]">Photo Attachment</p>
        <div className="w-[100%] border-BgSoftWhite ">

          {/* Display Images */}
          <div className="flex justify-start flex-wrap gap-[20px] mt-[20px]">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative border rounded-md overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="object-cover w-[80px] h-[80px] rounded-xls"
                  onError={(e) => (e.currentTarget.src = defaultProfile)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoAttachment;