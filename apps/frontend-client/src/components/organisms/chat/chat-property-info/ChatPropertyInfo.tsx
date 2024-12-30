"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Home, Bed, Bath, ParkingCircle } from "lucide-react";
import { FaArrowsUpDownLeftRight } from "react-icons/fa6";

interface PropertyDetails {
  image: string;
  type: string;
  bedroom: string;
  bathroom: string;
  spacious: string;
  parking: string;
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
}

interface ChatPropertyInfoProps {
  propertyDetails?: PropertyDetails;
  userDetails?: UserDetails;
}

export function ChatPropertyInfo({
  propertyDetails,
  userDetails,
}: ChatPropertyInfoProps) {
  const [activeTab, setActiveTab] = useState<"user" | "property">("user");

  return (
    <div className="w-full h-full bg-[#d9d9d9] p-4 border-l pt-24">
      <div className="flex space-x-2 mb-4 pb-4 border-b border-gray-400">
        <button
          onClick={() => setActiveTab("user")}
          className={`flex-1 py-2 text-center font-semibold rounded-lg ${
            activeTab === "user" ? "bg-[#7d7757] text-white" : "bg-[#d9d9d9] text-black border border-gray-600"
          }`}
        >
          User
        </button>
        <button
          onClick={() => setActiveTab("property")}
          className={`flex-1 py-2 text-center font-semibold rounded-lg ${
            activeTab === "property" ? "bg-[#7d7757] text-white" : "bg-[#d9d9d9] text-black border border-gray-600"
          }`}
        >
          Property
        </button>
      </div>

      {activeTab === "user" && userDetails ? (
        <div>
            <div className="flex flex-col items-center space-x-3 mb-10">
                <img
                src={userDetails.profileImage || "/images/default-profile.jpg"}
                alt="User Profile"
                className="w-20 h-20 rounded-full object-cover bg-black mb-2"
                />
                <div>
                <h3 className="text-lg font-bold mt-2">{userDetails.name}</h3>
                <p className="text-sm text-gray-500">@{userDetails.name.toLowerCase().replace(" ", "-")}</p>
                </div>
            </div>
            <ul className="text-sm space-y-6">
                <li className="flex items-center gap-2">
                    <Mail size={26} /> {userDetails.email}
                </li>
                <li className="flex items-center gap-2">
                <Phone size={26} /> {userDetails.phone}
                </li>
                <li className="flex items-center gap-2">
                <MapPin size={26}/> {userDetails.address}
                </li>
            </ul>
        </div>
      ) : activeTab === "property" && propertyDetails ? (
        <div>
          <img
            src={propertyDetails.image}
            alt="Property"
            className="w-full h-40 rounded-lg object-cover mb-4 bg-black"
          />
          <h3 className="text-lg font-bold mb-4">Property Info</h3>
          <ul className="text-sm space-y-4">
            <li className="flex items-center gap-2">
                <Home size={26} className="text-olive-green" /> 
              <strong className="text-[#888888]">Type:</strong> {propertyDetails.type}
            </li>
            <li className="flex items-center gap-2">
                <Bed size={26} className="text-olive-green" />
              <strong className="text-[#888888]">Bedroom:</strong> {propertyDetails.bedroom}
            </li>
            <li className="flex items-center gap-2">
                <Bath size={26} className="text-olive-green" />
              <strong>Bathroom:</strong> {propertyDetails.bathroom}
            </li>
            <li className="flex items-center gap-2">
                <FaArrowsUpDownLeftRight size={26} className="text-olive-green" />
              <strong>Spacious:</strong> {propertyDetails.spacious}
            </li>
            <li className="flex items-center gap-2">
                <ParkingCircle size={26} className="text-olive-green" />
              <strong>Parking:</strong> {propertyDetails.parking}
            </li>
          </ul>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No details available
        </div>
      )}
    </div>
  );
}
