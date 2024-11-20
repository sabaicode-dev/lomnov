import React from "react";
import LocationPost from "@/components/molecules/location-post/LocationPost";
import { useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { useEffect } from "react";
import axios from "axios";
import Map from "@/components/molecules/map/Map";


async function fetchProperty(id: string): Promise<RealEstateItem | null> {
  try {
    const res = await axios.get(`https://lomnov.onrender.com/api/v1/properties?id=${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch property data");
    }
    const data = await res.data;
    return data[0] || null;  // Ensure it returns null if no data found
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}



function LocationProperty() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [property, setProperty] = useState<RealEstateItem | null>(null);  // Add state to hold the property data







  const handleLocationChange = (option: { name: string }) => {
    setSelectedLocation(option.name);  // Update state with selected location
    console.log("Selected location:", option.name);  // You can perform any action here
  };

  useEffect(() => {
    const loadProperty = async () => {
      const fetchedProperty = await fetchProperty("1");  // Here we're passing a mock id "1"
      setProperty(fetchedProperty);  // Set fetched property in the state
    };

    loadProperty();
  }, []);



  return (
    <div>
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
            />
          </svg>
          <span className="text-lg font-bold text-gray-900">Location</span>
        </div>
        <div className="mt-5 ms-10">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="font-medium">
                City/Province: <span className="text-red-500">*</span>
              </label>
              <br />
              {/* Pass the onChange handler to LocationPost */}
              <LocationPost onChange={handleLocationChange} />

              <label className="font-medium">
                SangKat/Commune: <span className="text-red-500">*</span>
              </label>
              <br />
              <input type="text" className="border-[2px] border-gray-400 rounded-lg w-[97%] px-5 py-3 mt-2 mb-4" placeholder="Enter the SangKat/Commune" />

              <label className="font-medium">
                Khom/District: <span className="text-red-500">*</span>
              </label>
              <br />
              <input type="text" className="border-[2px] border-gray-400 rounded-lg w-[97%] px-5 py-3 mt-2 mb-4" placeholder="Enter the khom/district" />
            </div>


            <div>
              <label className="font-medium">
                Village: <span className="text-red-500">*</span>
              </label>
              <br />
              <input type="text" className="border-[2px] border-gray-400 rounded-lg w-[97%] px-5 py-3 mt-2 mb-4" placeholder="Enter the Village" />

              <label className="font-medium">
                Street number: <span className="text-red-500">*</span>
              </label>
              <br />
              <input type="text" className="border-[2px] border-gray-400 rounded-lg w-[97%] px-5 py-3 mt-2 mb-4" placeholder="Enter the street number" />
            </div>
          </div>

          {/* Map */}

          <label className="font-medium mb-5">
                Location on Map: <span className="text-red-500">*</span>
          </label>
          {property ? (
          <div className="w-full h-full mt-10">
            <Map property={property.mapurl || ""} />
          </div>
        ) : (
          <p className="text-center">Loading map or property data...</p>
        )}
        </div>
    </div>
  )
}

export default LocationProperty;
