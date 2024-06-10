import { Facebook, Google, TwitterX } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import image from "@/images/Login logo.png";

function page() {
  return (
    <div className="mx-auto  p-4 md:py-20" style={{ maxWidth: "1300px" }}>
      <div className="flex flex-col sm:flex-row gap-8 md:gap-32 justify-between items-center">
        <Image
          src={image}
          alt="Login logo"
          width={"500"}
          height={"500"}
          priority
          className="w-[30%] sm:w-1/3  h-auto"
        />
        <div className="flex flex-col gap-5 w-full md:w-2/4">
          <div className="w-full flex gap-5 justify-center items-center">
            <Google props="text-blue-500 text-2xl md:text-3xl" />
            <Facebook props="text-blue-500 text-2xl md:text-3xl" />
            <TwitterX props="text-blue-500 text-2xl md:text-3xl" />
          </div>
          <div className="flex flex-row gap-5 justify-center items-center">
            <div className="w-2/4 md:w-[50%] border border-gray-300"></div>
            <span className="text-gray-400 font-semibold">Or</span>
            <div className="w-2/4 md:w-[50%] border border-gray-300"></div>
          </div>
          <form>
            <input
              type="text"
              placeholder="email"
              className="w-full px-2 mb-5 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent"
            />
            <input
              type="password"
              placeholder="password"
              className="w-full px-2 py-2 mb-5 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent"
            />
            <button className="bg-blue-500 text-white px-5 py-2 w-full rounded-md">
              Login
            </button>
          </form>
          <div className="text-center">
            <span className="text-gray-400"> Not yet have an account? </span>
            <Link href="/pages/signup" className="text-blue-500 font-semibold">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
