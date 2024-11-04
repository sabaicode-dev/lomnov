"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import banner from "@/images/banner.png";

const VerifyAccount: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (index < 5) {
        const nextInput = document.getElementById(`digit-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (newCode[index]) {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        const previousInput = document.getElementById(`digit-${index - 1}`);
        previousInput?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      const previousInput = document.getElementById(`digit-${index - 1}`);
      previousInput?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async () => {
    if (isLoading || !email || code.some((digit) => digit === "")) return;

    setIsLoading(true);
    setErrorMessage(null); // Clear previous error message
    const verificationCode = code.join("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_AUTH}/auth/verify`,
        { email, code: verificationCode },
      );

      if (response.data.message) {
        setSuccessMessage("Account verified successfully!");
        setTimeout(() => router.push("/signin"), 2000);
      } else {
        setErrorMessage("Verification failed. Please try again.");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrorMessage("Invalid verification code. Please try again.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setResendMessage("No email provided. Unable to resend verification code.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_AUTH}/auth/resend-code`,
        { email },
      );
      setResendMessage(
        response.data.message
          ? "Verification code resent successfully."
          : "Failed to resend code. Please try again."
      );
    } catch {
      setResendMessage("Unable to resend code. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative bg-gray-100 min-screen flex flex-col items-center">
      <header className="relative w-full h-[300px] md:h-[400px]">
        <Image src={banner} alt="banner" layout="fill" objectFit="cover" className="brightness-75" />
        <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
          <h1>Welcome to Lomnov!</h1>
        </div>
        <div className="absolute left-0 bottom-[130px] w-[120px] h-px bg-white"></div>
        <div className="absolute left-[10%] bottom-[85px] font-helvetica text-sm md:text-base lg:text-helvetica-paragraph text-white">
          <p>Please fill your code that we sent to your email.</p>
        </div>
      </header>

      <form className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 mt-[-50px] z-10">
        <div className="text-center mb-6 text-black">
          <h1 className="text-xl md:text-4xl font-coolvetica mb-3">Verify Account</h1>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`digit-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border rounded-md text-xl focus:ring-2 shadow-sm"
            />
          ))}
        </div>

        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || code.some((digit) => digit === "")}
          className={`${isLoading ? "bg-gray-300" : "bg-olive-drab"} w-full py-3 rounded-lg font-semibold transition`}
        >
          {isLoading ? "Verifying..." : "Verify Account"}
        </button>

        {resendMessage && <p className="text-gray-500 mt-4">{resendMessage}</p>}
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoading}
          className="mt-4 w-full text-blue-600"
        >
          Resend Code
        </button>
      </form>
    </div>
  );
};

export default VerifyAccount;
