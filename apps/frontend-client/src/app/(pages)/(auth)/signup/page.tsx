import React from "react";
import Image from "next/image";
import { Facebook, Google, TwitterX } from "@/icons";
import Link from "next/link";
import image from "@/images/register-logo.png";

function Page() {
  return (
    <div className="mx-auto p-4 md:py-20" style={{ maxWidth: "1300px" }}>
      <div className="flex flex-col sm:flex-row gap-8 md:gap-32 justify-between items-center">
        <Image
          src={image}
          alt="Register Logo"
          width={"500"}
          height={"500"}
          priority
          className="w-[30%] sm:w-1/3 h-auto"
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
              placeholder="user name"
              className="w-full px-2 mb-5 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent"
            />
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-2 mb-5 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent"
            />
            <input
              type="email"
              placeholder="email"
              className="w-full px-2 mb-5 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent"
            />
            <input
              type="password"
              placeholder="password"
              className="w-full px-2 mb-5 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent"
            />

            <button className="bg-blue-500 text-white px-5 py-2 w-full rounded-md">
              Register
            </button>
          </form>
          <div className="text-center">
            <span className="text-gray-400">Already have an account?</span>
            <Link href="/signin" className="text-blue-500 font-semibold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
