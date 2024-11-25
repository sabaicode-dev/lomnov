// import React from 'react';
// import { useState } from 'react';

// const InformationProperty = ({handleErrorMessage}:{handleErrorMessage:(error:string)=>void}) => {

//   const [formData, setFormData] = useState<any>({
//     thumbnail: "",
//     propertyImages: "",
//     video: "",
//     price: "",
//     bedroom: "",
//     bathroom: "",
//     livingRoom: "",
//     landArea: "",
//     priceDiscount: "",
//     floor: "",
//     kitchen: "",
//     parking: "",
//     moreDetails: "",
//   });

//   const [errors, setErrors] = useState<any>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData: any) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validate = () => {
//     let newErrors: any = {};
//     let isValid = true;

//     // Check for empty required fields
//     const requiredFields = [
//       'thumbnail',
//       'propertyImages',
//       'video',
//       'price',
//       'bedroom',
//       'bathroom',
//       'livingRoom',
//       'landArea',
//       'floor',
//       'kitchen',
//       'parking',
//     ];
//         requiredFields.forEach((field) => {
//       if (!formData[field]) {
//         newErrors[field] = 'This field is required';
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleFormSubmit = () => {
//     if (validate()) {
//       // If validation passes, clear any error messages
//       handleErrorMessage('');
//     } else {
//       // If validation fails, set the error message
//       handleErrorMessage('Please fill all required fields.');
//     }
//   };

//   return (
//     <div>
//       <div className="mt-10 flex items-center space-x-3">
//           <svg
//             className="w-4 h-4 text-gray-800 dark:text-red-600"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               stroke="currentColor"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
//             />
//           </svg>

//           <span className="text-lg font-bold text-gray-900">
//             Information your property
//           </span>
//         </div>
//       <div className="mt-5 ms-10">

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label className="font-medium mb-8">
//             Image for thumnail: <span className="text-red-500">*</span>
//           </label>
//           <div className="flex justify-center items-center p-6 border-2 border-dashed border-gray-400 rounded-lg">
//             <input type="file" accept="image/*" className={`hidden ${errors.thumbnail ? 'border-red-500' : ''}`}  onChange={handleChange} />
//             <label className="cursor-pointer flex flex-col items-center">
//             <svg
//                   className="w-10 h-10 text-gray-800 dark:text-gray-500 "
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//               <p className="mt-2 text-gray-600">Drop your image property here</p>
//             </label>
//           </div>
//           {errors.thumbnail && <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>}
//       </div>
//       <div>
//       <label className="font-medium mb-8">
//             Image your properties: <span className="text-red-500">*</span>
//           </label>
//           <div className="flex justify-center items-center p-6 border-2 border-dashed border-gray-400 rounded-lg">
//             <input type="file" accept="image/*" className="hidden"  />
//             <label className="cursor-pointer flex flex-col items-center">
//             <svg
//                   className="w-10 h-10 text-gray-800 dark:text-gray-500 "
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//               <p className="mt-2 text-gray-600">Drop your image property here</p>
//             </label>
//           </div>
//       </div>

//     </div>

//       </div>

//       <div className="mt-5 ms-10">
//         <label className="font-medium mb-8">
//           Video: <span className="text-red-500">*</span>
//         </label>
//         <div className="flex justify-center items-center p-6 border-2 bg-white rounded-lg">
//             <input
//               type="file"
//               accept="video/*"
//               className="border-[2px] hover:border-blue-600 active:border-blue-600 transition-transform duration-150 rounded-lg w-[97%] px-5 py-3 mt-2 "
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-5 mt-8">
//             <div className="">
//                 <label htmlFor="" className='font-medium'>Price Sale: <span className="text-red-500 ">*</span></label>
//                 <input type="number" placeholder="Enter your property price" className="border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />
//                 {/* <label htmlFor="">$</label> */}

//                 <label htmlFor="" className="mt-4 font-medium">Bedroom: <span className="text-red-500">*</span></label>
//                 <input type="text" placeholder="Enter a number" className="border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

//                 <label htmlFor="" className='font-medium'>Bathroom: <span className="text-red-500">*</span></label>
//                 <input type="text" placeholder="Enter a number" className="border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

//                 <label htmlFor=""className='font-medium'>Living room: <span className="text-red-500">*</span></label>
//                 <input type="text" placeholder="Enter a number" className="border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

//                 <label htmlFor="" className="font-medium">Land Area: <span className="text-red-500">*</span></label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Enter a number"
//                     className="border-[2px] border-gray-400 rounded-lg w-[98%] px-5 py-3 mt-2 mb-4 pr-16" // Added pr-16 for padding to the right
//                   />
//                   <span className="absolute right-5 top-1/2 transform -translate-y-1/2  text-gray-600 text-lg">m<sup>2</sup></span> {/* Positioning m² */}
//                 </div>

//             </div>
//             <div className="ms-3">
//                 <label htmlFor="" className='font-medium'>Price discount: </label>
//                 <input type="text" placeholder="Enter your price discount" className="border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />
//                 {/* <label htmlFor="">$</label> */}

//                 <label htmlFor="" className='font-medium'>Floor: <span className="text-red-500">*</span></label>
//                 <input type="text" placeholder="Enter a number" className="border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

//                 <label htmlFor="" className='font-medium'>Kitchen: <span className="text-red-500">*</span></label>
//                 <input type="text" placeholder="Enter a number" className="border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

//                 <label htmlFor="" className='font-medium'>Parking : <span className="text-red-500">*</span></label>
//                 <input type="text" placeholder="Enter a number" className="border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

//             </div>

//           </div>
//             <label htmlFor="" className="text-[25px] font-bold">Add more details</label>
//             <input type="text" placeholder="Enter your more property details" className="border-[2px] border-gray-400 rounded-lg w-[97%] h-[250px] px-5 py-3 mt-2 mb-4" />
//         </div>
//         </div>

//   );
// };

// export default InformationProperty;

import React, { useState } from "react";

const InformationProperty = ({
  handleErrorMessage,
}: {
  handleErrorMessage: (error: string) => void;
}) => {
  const [formData, setFormData] = useState<any>({
    thumbnail: "",
    propertyImages: "",
    video: "",
    price: "",
    bedroom: "",
    bathroom: "",
    livingRoom: "",
    landArea: "",
    priceDiscount: "",
    floor: "",
    kitchen: "",
    parking: "",
    moreDetails: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: files[0], // Save the file as part of the form data
      }));
    }
  };

 function validate  () {
    const newErrors: any = {};
    let isValid = true;

    const requiredFields = [
      "thumbnail",
      "propertyImages",
      "video",
      "price",
      "bedroom",
      "bathroom",
      "livingRoom",
      "landArea",
      "priceDiscount",
      "floor",
      "kitchen",
      "parking",
      "moreDetails",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

 function handleFormSubmit () {
    if (validate()) {
      handleErrorMessage("");
      console.log("Form data:", formData);
    } else {
      handleErrorMessage("Please fill out all required fields.");
    }
  };



  return (
    <div>
      <div className="mt-10">
        <div className="mt-10 flex items-center space-x-3">
          <svg
            className="w-4 h-4 text-gray-800 dark:text-red-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
            />
          </svg>

          <span className="text-lg font-bold text-gray-900">
            Information your property
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* Thumbnail */}
          <div>
            <label className="font-medium mb-8">
              Thumbnail Image: <span className="text-red-500">*</span>
            </label>
            <div className={`flex justify-center items-center p-6 border-2 border-dashed border-gray-400 rounded-lg   ${
                  errors.thumbnail ? "border-red-500" : "border-dashed border-gray-400"
                }`}>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <label className="cursor-pointer flex flex-col items-center">
                <svg
                  className={`w-10 h-10 text-gray-800 dark:text-gray-500 ${
                    errors.thumbnail ? "dark:text-red-500" : "text-gray-800"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className={`mt-2 text-gray-600 ${errors.thumbnail ? "text-red-500" : "text-gray-600"}`}>Drop your image here</p>
              </label>
            </div>
            {errors.thumbnail && (
              <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>
            )}
          </div>

          {/* Property Images */}
          <div>
            <label className="font-medium mb-8">
              Property Images: <span className="text-red-500">*</span>
            </label>
            <div className={`flex justify-center items-center p-6 border-2 border-dashed border-gray-400 rounded-lg   ${
                  errors.propertyImages ? "border-red-500" : "border-dashed border-gray-400"
                }`}>
              <input
                type="file"
                name="propertyImages"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <label className="cursor-pointer flex flex-col items-center">
                <svg
                  className={`w-10 h-10 text-gray-800 dark:text-gray-500 ${
                    errors.propertyImages ? "dark:text-red-500" : "text-gray-800"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className= {`mt-2 text-gray-600 ${errors.propertyImages ? "text-red-500" : "text-gray-600"}`}>Drop property images here</p>
              </label>
            </div>
            {errors.propertyImages && (
              <p className="text-red-500 text-xs mt-1">
                {errors.propertyImages}
              </p>
            )}
          </div>
        </div>

        {/* Video */}
        <div className="mt-5">
          <label className="font-medium">
            Video: <span className="text-red-500">*</span>
          </label>
         <div className="flex justify-center items-center p-6 border-2 bg-white rounded-lg">

          <input
            type="file"
            name="video"
            accept="video/*"
            className={`border-[2px] hover:border-blue-500 active:border-blue-500 transition-transform duration-150 rounded-lg w-[97%] px-5 py-3 mt-2 ${errors.video ? "border-red-500 shadow-outline" : " border-gray-400" }`}
            onChange={handleFileChange}
          />
          </div>
          {errors.video && (
            <p className="text-red-500 text-xs mt-1">{errors.video}</p>
          )}
        </div>

        {/* Additional Inputs */}
        <div className="grid grid-cols-2 gap-5 mt-8">
          <div>
            <label className="font-medium">
              Price: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="price"
              placeholder="Enter price"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.price ? "border-red-500 shadow-outline" : " border-gray-400" }`}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}

            <label className="font-medium">
              Bedroom: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="bedroom"
              placeholder="Enter bedroom count"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.bedroom ? "border-red-500 shadow-outline" : " border-gray-400" }`}
              onChange={handleChange}
            />
            {errors.bedroom && (
              <p className="text-red-500 text-xs mt-1">{errors.bedroom}</p>
            )}

            <label htmlFor="" className="font-medium">
              Bathroom: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter a number"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.bathroom ? "border-red-500 shadow-outline" : " border-gray-400" }`}
              onChange={handleChange}
            />

            {errors.bathroom && (
              <p className="text-red-500 text-xs mt-1">{errors.bathroom}</p>
            )}

            <label htmlFor="" className="font-medium">
              Living room: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter a number"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.livingRoom ? "border-red-500 shadow-outline" : " border-gray-400" }`}
            />
            {errors.livingRoom && (
              <p className="text-red-500 text-xs mt-1">{errors.livingRoom}</p>
            )}

            <label htmlFor="" className="font-medium">
              Land Area: <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter a number"
                className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.landArea ? "border-red-500 shadow-outline" : " border-gray-400" }`}
                onChange={handleChange}
/>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2  text-gray-600 text-lg">
                m<sup>2</sup>
              </span>
              {/* Positioning m² */}

              {errors.landArea && (
                <p className="text-red-500 text-xs mt-1">{errors.landArea}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="" className="font-medium">
              Price discount:
            </label>
            <input
              type="text"
              placeholder="Enter your price discount"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.priceDiscount ? "border-red-500 shadow-outline" : " border-gray-400" }`}
              onChange={handleChange}
            />
            {/* <label htmlFor="">$</label> */}
            {errors.priceDiscount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.priceDiscount}
              </p>
            )}

            <label htmlFor="" className="font-medium">
              Floor: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter a number"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.floor ? "border-red-500 shadow-outline" : " border-gray-400" }`}
              onChange={handleChange}
            />
            {errors.floor && (
              <p className="text-red-500 text-xs mt-1">{errors.floor}</p>
            )}

            <label htmlFor="" className="font-medium">
              Kitchen: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter a number"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.kitchen ? "border-red-500 shadow-outline" : " border-gray-400" }`}
              onChange={handleChange}
            />
            {errors.kitchen && (
              <p className="text-red-500 text-xs mt-1">
                {errors.priceDiscount}
              </p>
            )}

            <label htmlFor="" className="font-medium">
              Parking : <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter a number"
              className={`border-[2px] border-gray-400 rounded-lg w-[95%] px-5 py-3  mt-2 ${errors.parking ? "border-red-500 shadow-outline" : " border-gray-400" }`}
              onChange={handleChange}
            />

            {errors.parking && (
              <p className="text-red-500 text-xs mt-1">{errors.parking}</p>
            )}
          </div>
        </div>
        <label htmlFor="" className="text-[25px] font-bold mt-5">
          Add more details
        </label>
        <input
          type="text"
          placeholder="Enter your more property details"
          onChange={handleChange}
          className={`border-[2px] border-gray-400 rounded-lg w-[97%] h-[250px] px-5 py-3 mt-2 ${errors.moreDetails ? "border-red-500 shadow-outline" : " border-gray-400" }`}
          />
        {errors.moreDetails && (
          <p className="text-red-500 text-xs mt-1">{errors.moreDetails}</p>
        )}

        {/* Submit */}
        {/* <button
          onClick={handleFormSubmit}
          className="mt-8 text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-4 py-2"
        >
          Submit
        </button> */}
      </div>
    </div>
  );
  
};





export default InformationProperty;
