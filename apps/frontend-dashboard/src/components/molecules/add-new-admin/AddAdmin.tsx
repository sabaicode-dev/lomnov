"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/useAuth";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .regex(/^[A-Za-z]+$/, "Username must contain only letters (A-Z, a-z)."),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z
  .string()
  .nonempty("Role is required")
  .refine((value) => value === "Admin" || value === "admin", {
    message: "Role must be either 'Admin' or 'admin'.",
  }),
});

type SignupData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const { signup } = useAuth();
  const [isVerifyPopupOpen, setIsVerifyPopupOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [verifyMethod, setVerifyMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset, // Reset function to clear the form
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignupData) => {
    setLoading(true);
    setErrorMessage(""); // Clear any previous error message
    try {
      await signup(data);
      setContact(data.email); // Set contact for verification
      setVerifyMethod("email"); // Assuming email verification
      setIsVerifyPopupOpen(true);
      reset(); // Clear the form upon successful signup
    } catch (error) {
      if (error) {
        setErrorMessage(
          "This email is already registered. Please use a different email.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-10 p-6 bg-BgSoftWhite rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full text-black">
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <div className="w-full mb-4">
          <label>Username*</label>
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full h-10 bg-white border border-gray-300 mt-2 rounded-md p-2 focus:outline-none focus:border-Primary"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="w-full mb-4">
          <label>Email*</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full h-10 bg-white border border-gray-300 mt-2 rounded-md p-2 focus:outline-none focus:border-Primary"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full mb-4">
          <label>Password*</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full h-10 bg-white border border-gray-300 mt-2 rounded-md p-2 focus:outline-none focus:border-Primary"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="w-full mb-4">
          <label>Role*</label>
          <input
            type="text"
            placeholder="Role"
            {...register("role")}
            className="w-full h-10 bg-white border border-gray-300 mt-2 rounded-md p-2 focus:outline-none focus:border-Primary"
          />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-Primary text-white rounded-md hover:bg-Primary/80"
          disabled={loading}
        >
          {loading ? "Add ..." : "Add"}
        </button>
        <button
          type="button" // Set the button type to "button" to prevent form submission
          className="px-4 py-2 bg-slate-300 text-[#333333] font-[600px] rounded-md ml-[10px] hover:bg-gray-400"
          onClick={() => reset()} // Call the reset function to clear the form
        >
          Cancel
        </button>
      </form>

      {isVerifyPopupOpen && (
        <VerifyPopup
          contact={contact}
          method={verifyMethod}
          onClose={() => setIsVerifyPopupOpen(false)}
        />
      )}
    </div>
  );
};

interface VerifyPopupProps {
  contact: string;
  method: string;
  onClose: () => void;
}

const VerifyPopup: React.FC<VerifyPopupProps> = ({
  contact,
  method,
  onClose,
}) => {
  const { verify } = useAuth();
  const [code, setCode] = useState<string[]>(Array(6).fill("")); // Array to hold individual digits
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Refs for input fields

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input box if value is entered
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    const newCode = [...code];
    newCode[index] = "";
    setCode(newCode);

    // Move to the previous input box if empty
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setSuccessMessage(""); // Clear previous success message
    try {
      await verify({
        [method]: contact,
        code: code.join(""), // Join the digits into a single string
      });
      setSuccessMessage("Verification successful!");
      setTimeout(onClose, 2000); // Close the popup after 2 seconds
    } catch (error) {
      console.error("Verification error:", error);
      alert("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md text-center">
        <p className="text-xl font-semibold mb-4">Verification Needed</p>
        <p className="text-gray-600 mb-4">
          {`We've sent a verification code to your ${method}: ${contact}. Please enter the code below.`}
        </p>
        <div className="flex justify-between mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[index] = el; // Assign ref to the array
              }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") handleBackspace(index);
              }}
              className="w-10 h-12 text-center bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>

        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}
        <button
          onClick={handleVerify}
          className="w-full py-2 bg-Primary text-white rounded-md hover:bg-Primary/80"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
