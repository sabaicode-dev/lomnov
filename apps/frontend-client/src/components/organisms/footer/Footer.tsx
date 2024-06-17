import React from 'react';
import { Facebook, Instagram, TwitterX } from "@/icons";
import Link from "next/link";

export interface FooterProps {
  aboutText: string;
  contactPhone: string;
  contactLocation: string;
  companyName: string;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
}

const Footer: React.FC<FooterProps> = ({
  aboutText,
  contactPhone,
  contactLocation,
  companyName,
  facebookLink,
  twitterLink,
  instagramLink,
}) => {
  return (
    <footer className="w-full">
      <div className="xl:w-[1300px] m-auto border-t-[1px] border-solid border-black flex flex-col gap-5 py-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-28 gap-5 px-5 mb-10">
          <div className="flex flex-col items-center md:items-start gap-5">
            <h1 className="text-[20px] font-[500]">About Us</h1>
            <p className="text-center md:text-left">
              {aboutText}
            </p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-[20px] font-[500]">Contact Us</h1>
            <p className="text-center">
              Phone Number: {contactPhone} <br />
              Location: {contactLocation}
            </p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-[20px] font-[500]">Find Us</h1>
            <div className="flex flex-row gap-5">
              <Link href={facebookLink}><Facebook props="text-[28px] text-blue-500" /></Link>
              <Link href={twitterLink}><TwitterX props="text-[24px]" /></Link>
              <Link href={instagramLink}><Instagram props="text-[28px] text-red-600" /></Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <ul className="flex flex-row gap-5">
            {/* Add menu items here */}
          </ul>
          <div className="flex gap-5 items-center">
            <div className="w-[45px] h-[45px] rounded-full bg-gray-500"></div>
            <h1 className="text-[24px] font-[600]">{companyName}</h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
