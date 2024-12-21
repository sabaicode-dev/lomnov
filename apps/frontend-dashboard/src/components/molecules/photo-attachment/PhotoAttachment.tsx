// "use client";

// import React, { useState } from "react";

// //=====================
// interface IPhotoAttachmentProps {
//   initialImages?: string[];
//   defaultProfile: string;
// }

// const PhotoAttachment = ({ initialImages = [], defaultProfile }: IPhotoAttachmentProps) => {
//   const [images, setImages] = useState<string[]>(initialImages);

//   return (
//     <div>
//       <div className="w-full mt-5 p-6 bg-gray-100 rounded-lg">
//         <p className="text-lg font-semibold">Photo Attachment</p>
//         <div className="w-[100%] border-BgSoftWhite ">

//           {/* Display Images */}
//           <div className="flex flex-wrap gap-4 mt-5">
//             {images.map((image, index) => (
//               <div
//                 key={index}
//                 className="relative w-[200px] h-[200px] border rounded-lg overflow-hidden"
//               >
//                 <img
//                   src={image}
//                   alt={`Uploaded ${index}`}
//                   className="object-cover w-full h-full"
//                   onError={(e) => (e.currentTarget.src = defaultProfile)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotoAttachment;

"use client";
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react'
import { TiDeleteOutline } from "react-icons/ti";
interface IPhotoAttachmentProps {
  OnImageChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  imagePreviews?: string[];
  OnremoveImage: (index: number) => void;
}
const PhotoAttachment = ({OnImageChange, imagePreviews, OnremoveImage}: IPhotoAttachmentProps) => {

  // const removeImage = (index: number) => {
  //   setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  // };
  return (
    <div>
      <div className="w-[100%] mt-[20px] p-[24px] bg-[#F3F4F6] rounded-xls">
        <p className="text-[20px] font-[600]">Photo Attachment</p>
        <div className="w-[100%] border-BgSoftWhite ">
          <label
            htmlFor="multi-file-upload"
            className="flex flex-col items-center"
          >

            <span className="text-Black w-[100%] text-center text-[14px] mb-[20px] h-[40px] rounded-md p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[20px] focus:outline-none focus:border-Primary/20">
              Drag and Drop your files or  <span className="text-Primary">Browse</span>
            </span>
            <input
              id="multi-file-upload"
              type="file"
              accept="image/*"
              name='images'
              multiple
              onChange={OnImageChange}
              className="hidden"
            />
          </label>

          <div className="flex justify-center items-center gap-[20px]">
            {imagePreviews?.map((image, index) => (
              <div
                key={index}
                className="relative border rounded-md overflow-hidden"
              >
                <Image
                  width={100}
                  height={100}
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="object-cover w-[80px] h-[80px] rounded-xls"
                />
                <div
                  onClick={() => OnremoveImage(index)}
                  className="absolute top-1 right-1 text-Negative text-[20px]"
                >
                  <TiDeleteOutline />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoAttachment;