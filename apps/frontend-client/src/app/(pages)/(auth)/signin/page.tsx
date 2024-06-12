"use client";

import React, { useState, FormEvent } from "react";
import { Facebook, Google, TwitterX } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import image from "@/images/Login logo.png";

type FormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
};

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setFormErrors((prevErrors) => {
      return { ...prevErrors, [name]: "" };
    });
  };

  const validate = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Handle successful form submission
      console.log("Form data:", formData);
      // Clear form after submission
      setFormData({ email: "", password: "" });
      setFormErrors({});
    }
  };

  return (
    // <div className="mx-auto  p-4 md:py-20" style={{ maxWidth: "1300px" }}>
    //   <div className="flex flex-col sm:flex-row gap-8 md:gap-32 justify-between items-center">
    //     <Image
    //       src={image}
    //       alt="Login logo"
    //       width={"500"}
    //       height={"500"}
    //       priority
    //       className="w-[30%] sm:w-1/3  h-auto"
    //     />
    //     <div className="flex flex-col gap-5 w-full md:w-2/4">
    //       <div className="w-full flex gap-5 justify-center items-center">
    //         <Google props="text-blue-500 text-2xl md:text-3xl" />
    //         <Facebook props="text-blue-500 text-2xl md:text-3xl" />
    //         <TwitterX props="text-blue-500 text-2xl md:text-3xl" />
    //       </div>
    //       <div className="flex flex-row gap-5 justify-center items-center">
    //         <div className="w-2/4 md:w-[50%] border border-gray-300"></div>
    //         <span className="text-gray-400 font-semibold">Or</span>
    //         <div className="w-2/4 md:w-[50%] border border-gray-300"></div>
    //       </div>
    //       <form>
    //         <input
    //           type="text"
    //           placeholder="email"
    //           className="w-full px-2 mb-5 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent"
    //         />
    //         <input
    //           type="password"
    //           placeholder="password"
    //           className="w-full px-2 py-2 mb-5 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent"
    //         />
    //         <button className="bg-blue-500 text-white px-5 py-2 w-full rounded-md">
    //           Login
    //         </button>
    //       </form>
    //       <div className="text-center">
    //         <span className="text-gray-400"> Not yet have an account? </span>
    //         <Link href="/pages/signup" className="text-blue-500 font-semibold">
    //           Register
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className="container mx-auto p-4 md:py-20"
      style={{ maxWidth: "1300px" }}
    >
      <div className="flex flex-col sm:flex-row gap-8 md:gap-32 justify-center items-center">
        <Image
          src={image}
          alt="Login logo"
          width={500}
          height={500}
          priority
          className="w-2/4 sm:w-2/5 md:w-1/3 lg:w-1/4 h-auto"
        />
        <div className="flex flex-col gap-5 w-full sm:w-1/2 md:w-2/5 lg:w-2/5">
          <div className="w-full flex gap-5 justify-center items-center">
            <Google props="text-blue-500 text-2xl md:text-3xl" />
            <Facebook props="text-blue-500 text-2xl md:text-3xl" />
            {/* <TwitterX props="text-blue-500 text-2xl md:text-3xl" /> */}
          </div>
          <div className="flex items-center gap-5 justify-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-400 font-semibold">Or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base"
              />
              {formErrors.email && (
                <span className="text-red-500 text-sm absolute -left-[0%] top-11">
                  {formErrors.email}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base"
              />
              {formErrors.password && (
                <span className="text-red-500 text-sm absolute -left-[0%] top-11">
                  {formErrors.password}
                </span>
              )}
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Login
            </button>
          </form>

          <div className="text-center">
            <span className="text-gray-400">Not yet have an account? </span>
            <Link href="/pages/signup" className="text-blue-500 font-semibold">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
