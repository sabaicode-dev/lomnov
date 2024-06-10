import React from "react";
import Image from "next/image";
import { Facebook, Google, TwitterX } from "@/icons";
import Link from "next/link";

function page() {
  return (
    <>
      <div className=" container m-auto py-20 flex flex-row gap-32">
        {/* <Image src={image} alt="" width="500" height="400" /> */}
        <div className="flex flex-col gap-5">
          <div className="w-full flex gap-5 justify-center items-center">
            <Google props="text-blue-500 text-[30px]" />
            <Facebook props="text-blue-500 text-[30px]" />
            <TwitterX props="text-blue-500 text-[30px]" />
          </div>
          <div className=" flex flex-row gap-5 justify-center items-center">
            <div className="w-[45%] border-[0.9px] border-[#80808062] h-0"></div>
            <span className=" text-[#80808062] font-[600]">Or</span>
            <div className="w-[45%] border-[0.9px] border-[#80808062] h-0"></div>
          </div>
          <input
            type="text"
            placeholder="username"
            className="w-[500px] px-2 py-2 rounded-md hover:border-[2px] border-[1px] outline-none hover:border-blue-500 bg-transparent border-[#80808062]"
          />
          <input
            type="email"
            placeholder="email"
            className="w-[500px] px-2 py-2 rounded-md hover:border-[2px] border-[1px] outline-none hover:border-blue-500 bg-transparent border-[#80808062]"
          />
          <input
            type="password"
            placeholder="password"
            className="w-[500px] px-2 py-2 rounded-md hover:border-[2px] border-[1px] outline-none hover:border-blue-500 bg-transparent border-[#80808062]"
          />
          <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
            Register
          </button>
          <div className="flex flex-row gap-2">
            <span className="text-[#80808062]">Already have an account ?</span>
            <Link href={"/pages/signin"} className=" text-blue-500">
              Login
            </Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
