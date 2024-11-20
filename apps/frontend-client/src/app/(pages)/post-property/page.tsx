'use client'

import React, { useState, useEffect } from "react";
import PropertyPost from "@/components/molecules/property-post/PropertyPost";
import Map from "@/components/molecules/map/Map";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import InformationProperty from "@/components/molecules/information-property/InformationProperty";
import axios from "axios";
import LocationProperty from "@/components/molecules/location-property/LocationProperty";
import PropertyPurpose from "@/components/molecules/property-purpose/PropertyPurpose";


// async function fetchProperty(id: string): Promise<RealEstateItem | null> {
//   try {
//     const res = await axios.get(`https://lomnov.onrender.com/api/v1/properties?id=${id}`);
//     if (res.status !== 200) {
//       throw new Error("Failed to fetch property data");
//     }
//     const data = await res.data;
//     return data[0] || null;  // Ensure it returns null if no data found
//   } catch (error) {
//     console.error("Error fetching property:", error);
//     return null;
//   }
// }

function Page() {  // Change 'page' to 'Page' here
  // const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  // const [property, setProperty] = useState<RealEstateItem | null>(null);  // Add state to hold the property data

  // Fetch property when the component mounts
  // useEffect(() => {
  //   const loadProperty = async () => {
  //     const fetchedProperty = await fetchProperty("1");  // Here we're passing a mock id "1"
  //     setProperty(fetchedProperty);  // Set fetched property in the state
  //   };

  //   loadProperty();
  // }, []);

  // Handle location change event
  // const handleLocationChange = (option: { name: string }) => {
  //   setSelectedLocation(option.name);  // Update state with selected location
  //   console.log("Selected location:", option.name);  // You can perform any action here
  // };

  const handlePropertyChange = (option: { name: string }) => {
    setSelectedProperty(option.name);  // Update state with selected location
    console.log("Selected location:", option.name);  // You can perform any action here
  }

  return (
    <div className=" h-full mt-[150px] bg-[#F6F6F6]">
      <div className="ms-[130px] me-[130px]">
        {/* Property for / Property purpose */}

        <PropertyPurpose />

        {/* <div className="flex items-center space-x-3 mb-5">
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

          <span className="text-lg font-medium text-gray-900">
            Property For
          </span>
        </div>

        <div className="flex justify-center space-x-[300px] items-center font-helvetica text-helvetica-paragraph text-charcoal font-bold mt-5">
          <div>
            <input type="radio" className="me-[10px]" />
            <label className="ms-[5px]">Sale</label>
          </div>
          <div>
            <input type="radio" className="me-[10px]" />
            <label className="ms-[5px]">Rent</label>
          </div>
          <div>
            <input type="radio" className="me-[10px]" />
            <label className="ms-[5px]">Both</label>
          </div>
        </div> */}

        {/* Line */}
        <div className="mt-10 left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-full  h-px bg-black"></div>

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

          <span className="text-lg font-bold text-gray-900 font-Bold">Overview</span>
        </div>

        <div>
          <div className="mt-5 ms-10">
            <label className="font-medium">Title</label>
            <br />
            <input
              type="text"
              placeholder="Enter your title"
              className="border-[2px] border-gray-400 rounded-lg w-[100%] px-5 py-3 mt-2"
            />
          </div>

          <div className="mt-5 ms-10">
            <label className="font-medium">Description</label>
            <br />
            <input
              type="text"
              placeholder="Enter your description"
              className="border-[2px] border-gray-400 rounded-lg w-[100%] px-5 py-3 mt-2"
            />
          </div>
        </div>

        {/* Line */}
        <hr className="mt-10 left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-full   h-px border-black"/>

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

          <span className="text-lg font-medium text-gray-900">
            Property type
          </span>
        </div>

        <div className="mt-5 ms-10">
          <label className="font-bold">
            Type: <span className="text-red-500">*</span>
          </label>
          <br />
          <PropertyPost onChange={handlePropertyChange} />

        </div>

        {/* Line */}
        <div className="mt-10 left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-full  h-px bg-black"></div>

        {/* <div className="mt-10 flex items-center space-x-3">
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

          <span className="text-lg font-medium text-gray-900">
            Information your property
          </span>
        </div> */}

{/* image */}
        {/* <div className="mt-5 ms-10">
          <label className="font-bold mb-8">
            Image: <span className="text-red-500">*</span>
          </label>
          <br />
          <div className="flex justify-center items-center p-6 border-2 border-dashed border-gray-800 rounded-lg">
            <input
              type="file"
              accept="image/*"
              className="hidden"
            />
            <label
              form="imageInput"
              className="cursor-pointer flex flex-col items-center"
            >
              <svg
                className="w-10 h-10 text-gray-800 dark:text-gray-800 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                  clip-rule="evenodd"
                />
              </svg>

              <p className="mt-2 text-gray-600">
                Drop your image property here
              </p>
            </label>
          </div>
        </div> */}
      <InformationProperty />

{/* Video */}
        {/* <div className="mt-5 ms-10">
          <label className="font-bold mb-8">
            Video: <span className="text-red-500">*</span>
          </label>
          <br />
          <div className="flex justify-center items-center p-6 border-2 bg-white rounded-lg">
            <input
              type="file"
              accept="video/*"
              className="border-[1px] border-black rounded-lg w-[97%] px-5 py-3 mt-2 "
            />
          </div>
          <div className="grid grid-cols-2 gap-5 mt-8">
            <div className="">
                <label htmlFor="">Price Sale: <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your property price" className="border-[1px] border-black rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />
                <label htmlFor="" className="ms-2">$</label>


                <label htmlFor="" className="mt-4">Bedroom: <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter a number" className="border-[1px] border-black rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

                <label htmlFor="">Bathroom: <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter a number" className="border-[1px] border-black rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

                <label htmlFor="">Living room: <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter a number" className="border-[1px] border-black rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

                <label htmlFor="">Land Area: <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter a number" className="border-[1px] border-black rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />
                <label htmlFor="" className="ms-2">m<sup>2</sup></label>

            </div>
            <div className="ms-3">
                <label htmlFor="">Price discount: </label>
                <input type="text" placeholder="Enter your price discount" className="border-[1px] border-black rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />
                <label htmlFor="" className="ms-2">$</label>

                <label htmlFor="">Floor: <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter a number" className="border-[1px] border-black rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

                <label htmlFor="">Kitchen: <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter a number" className="border-[1px] border-black rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

                <label htmlFor="">Parking : <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter a number" className="border-[1px] border-black rounded-lg w-[95%] px-5 py-3 mt-2 mb-4" />

            </div>

          </div>
            <label htmlFor="" className="text-[25px] font-bold">Add more details</label>
            <input type="text" placeholder="Enter your more property details" className="border-[1px] border-black rounded-lg w-[97%] h-[250px] px-5 py-3 mt-2 mb-4" />
        </div> */}


        {/* Line */}
        {/* <div className="mt-10 left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-full  h-px bg-black"></div> */}
<hr className="border-black" />

         {/* Location Section */}

        <LocationProperty/>

         {/* <div className="mt-10 flex items-center space-x-3">
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
            />
          </svg>
          <span className="text-lg font-medium text-gray-900">Location</span>
        </div>

        <div className="mt-5 ms-10">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="font-bold">
                City/Province: <span className="text-red-500">*</span>
              </label>
              <br />
              <LocationPost onChange={handleLocationChange} />

              <label className="font-bold">
                SangKat/Commune: <span className="text-red-500">*</span>
              </label>
              <br />
              <input type="text" className="border-[1px] border-black rounded-lg w-[97%] px-5 py-3 mt-2 mb-4" placeholder="Enter the SangKat/Commune" />

              <label className="font-bold">
                Khom/District: <span className="text-red-500">*</span>
              </label>
              <br />
              <input type="text" className="border-[1px] border-black rounded-lg w-[97%] px-5 py-3 mt-2 mb-4" placeholder="Enter the khom/district" />
            </div>


            <div>
              <label className="font-bold">
                Village: <span className="text-red-500">*</span>
              </label>
              <br />
              <input type="text" className="border-[1px] border-black rounded-lg w-[97%] px-5 py-3 mt-2 mb-4" placeholder="Enter the Village" />

              <label className="font-bold">
                Street number: <span className="text-red-500">*</span>
              </label>
              <br />
              <input type="text" className="border-[1px] border-black rounded-lg w-[97%] px-5 py-3 mt-2 mb-4" placeholder="Enter the street number" />
            </div>
          </div>


          <label className="font-bold mb-5">
                Location on Map: <span className="text-red-500">*</span>
          </label>
          {property ? (
          <div className="w-full h-full mt-10">
            <Map property={property.mapurl || ""} />
          </div>
        ) : (
          <p className="text-center">Loading map or property data...</p>
        )}
        </div> */}


        <div className="flex flex-row justify-end mt-10">
        <button type="button" className=" text-white bg-red-700 hover:bg-red-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:scale-105 active:scale-95 transition-transform duration-150">Clear all</button>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:scale-105 active:scale-95 transition-transform duration-150">Create</button>
        </div>





        </div>
      </div>

  );
}
export default Page;  // Change 'page' to 'Page' here
