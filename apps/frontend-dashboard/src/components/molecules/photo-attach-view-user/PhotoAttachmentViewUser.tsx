"use client";

import React, { useState } from "react";

//=====================
interface IPhotoAttachmentProps {
  initialImages?: string[];
  defaultProfile: string;
}

const PhotoAttachmentViewUser = ({ initialImages = [], defaultProfile }: IPhotoAttachmentProps) => {
  const [images, setImages] = useState<string[]>(initialImages);

  return (
    <div>
      <div className="w-full mt-5 p-6 bg-gray-100 rounded-lg">
        <p className="text-lg font-semibold">Photo Attachment</p>
        <div className="w-[100%] border-BgSoftWhite ">

          {/* Display Images */}
          <div className="flex flex-wrap gap-4 mt-5">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-[200px] h-[200px] border rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="object-cover w-full h-full"
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

export default PhotoAttachmentViewUser;