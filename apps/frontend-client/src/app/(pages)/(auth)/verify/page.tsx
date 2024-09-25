"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

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
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {  // Only allow single digits
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus next input if it's not the last one
      if (index < 5 && value) {
        const nextInput = document.getElementById(`digit-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index]) {
      const previousInput = document.getElementById(`digit-${index - 1}`);
      previousInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const verificationCode = code.join("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_AUTH}/auth/verify`,
        {
          email,
          code: verificationCode,
        }
      );

      if (response.data.message) {
        setSuccessMessage("Account verified successfully!");
        setErrorMessage(null);

        // Redirect to sign-in page after 2 seconds using router
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        setErrorMessage("Verification failed. Please try again.");
        setSuccessMessage(null);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrorMessage("Invalid verification code. Please try again.");
      } else if (error.response) {
        setErrorMessage("Something went wrong. Please try again later.");
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_AUTH}/auth/resend-code`,
        { email }
      );
      if (response.data.message) {
        setResendMessage("Verification code resent successfully.");
      } else {
        setResendMessage("Failed to resend code. Please try again.");
      }
    } catch (error) {
      setResendMessage("Unable to resend code. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md px-8 py-10 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Mobile Phone Verification
        </h2>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit verification code that was sent to your phone number.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`digit-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-label={`Digit ${index + 1}`}
                className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {errorMessage && (
            <p className="text-red-500 mb-4" aria-live="assertive">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 mb-4" aria-live="polite">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? "bg-gray-400" : "bg-blue-600"
            } text-white w-full py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isLoading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <p className="mt-4 text-gray-500">
          Did not receive a code?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={handleResendCode}
            disabled={isLoading}
          >
            {isLoading ? "Resending..." : "Resend"}
          </button>
        </p>
        {resendMessage && (
          <p className="text-blue-500 mt-4" aria-live="polite">
            {resendMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;
