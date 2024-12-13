'use client'
import { useAuth } from '@/context/useAuth';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
// Zod schema for form validation
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const { isErrors, loading, login } = useAuth();
    const [visibleEye, setVisibleEye] = useState<boolean>(true);
    // Initialize react-hook-form with Zod validation
    const router = useRouter(); // For routing after successful login

    const { handleSubmit, register, formState: { errors } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    // Handle form submission
    const onSubmit = async (data: LoginData) => {
        try {
            // Attempt to log in the user
            await login({ email: data.email, password: data.password });
            router.push("/dashboard"); // Redirect to dashboard on successful login
        } catch (error) {
            throw error
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
            {/* Email input field */}
            <div className="w-full">
                <label className="block text-[16px] font-medium text-BlackSecondary">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-sm h-[49px] p-5 focus:outline-none font-[16px]"
                    {...register("email")} // Register with react-hook-form
                />
                {/* Show error message if validation fails */}
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                {isErrors && <p className="text-red-600 tracking-wider ">{isErrors}</p>}
            </div>

            {/* Password input field */}
            <div className="w-full">
                <label className="block text-[16px] font-medium text-BlackSecondary">Password</label>
                <div className=" relative ">
                    <input
                        type={`${visibleEye ? "password" : "text"}`}
                        placeholder="Enter your password"
                        className="w-full rounded-sm h-[49px] p-5 focus:outline-none"
                        {...register("password")} // Register with react-hook-form
                    />
                    {/* Show error message if validation fails */}
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    {isErrors && <p className="text-red-600 tracking-wider ">{isErrors}</p>}
                    <span onClick={() => setVisibleEye(!visibleEye)} className=" absolute top-4 right-5">{visibleEye ? <FaEye className="text-slate-400" /> : <FaEyeSlash className="text-slate-400" />}</span>
                </div>
            </div>

            {/* Remember me checkbox */}
            <div className="flex gap-[10px]">
                <input type="checkbox" className="w-[16px] h-[16px] bg-Primary" />
                <label className="text-Black font-[14px]">Remember me</label>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                className="bg-Primary rounded-sm h-[49px] p-5 flex items-center justify-center font-normal text-BgSoftWhite"
            >
                {loading ? "Login..." : "Login"}
            </button>
        </form>
    )
}
