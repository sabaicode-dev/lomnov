"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Home, Bed, Bath, ParkingCircle } from "lucide-react";
import { FaArrowsUpDownLeftRight } from "react-icons/fa6";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";



interface UserDetails {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  profileImage: string | undefined;
}

interface ChatPropertyInfoProps {

  userDetails?: UserDetails;
}

export function ChatPropertyInfo({

  userDetails,
}: ChatPropertyInfoProps) {
  const [activeTab, setActiveTab] = useState<"user" | "property">("user");

  return (
    <div className="w-full h-full p-4 border-l pt-24">
      <div className="flex space-x-2 mb-4 pb-4 border-b border-gray-400">
        <button
          
          className={`flex-1 py-2 text-center font-semibold rounded-lg ${
            activeTab === "user" ? "bg-[#7d7757] text-white" : "bg-[#d9d9d9] text-black border border-gray-600"
          }`}
        >
          User
        </button>
      
      </div>

      
        <div>
            <div className="flex flex-col items-center space-x-3 mb-10">
                <Image
                src={userDetails?.profileImage || "https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"}
                alt="User Profile"
                width={50}
                height={50}
                className="w-20 h-20 rounded-full object-cover bg-black mb-2"
                />
                <div>
                <h3 className="text-lg font-bold mt-2">{userDetails?.name}</h3>
                <p className="text-sm text-gray-500">@{userDetails?.name}</p>
                </div>
            </div>
            <ul className="text-sm space-y-6">
                <li className="flex items-center gap-2">
                    <Mail size={26} /> {userDetails?.email}
                </li>
                <li className="flex items-center gap-2">
                <Phone size={26} /> {userDetails?.phone}
                </li>
                <li className="flex items-center gap-2">
                <MapPin size={26}/> {userDetails?.address}
                </li>
            </ul>
        </div>
      
    </div>
  );
}
