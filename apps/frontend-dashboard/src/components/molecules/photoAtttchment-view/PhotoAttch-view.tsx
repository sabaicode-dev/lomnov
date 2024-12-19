"use client";

import React, { useState } from "react";

interface PhotoAttachmentProps {
  initialImages?: string[]; // Accept images from parent
}

const PhotoAttachment = ({ initialImages = [] }: PhotoAttachmentProps) => {
  const [images, setImages] = useState<string[]>(initialImages);

  return (
    <div className="w-full mt-5 p-6 bg-gray-100 rounded-lg">
      <p className="text-lg font-semibold">Photo Attachment</p>

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
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoAttachment;
