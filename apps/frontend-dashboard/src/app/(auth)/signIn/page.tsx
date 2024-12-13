'use client'

import { useAuth } from "@/context/useAuth";
import Logo from "@/images/lomnov-logo.png"
import Image from "next/image";
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

const Page = () => {
  const { login } = useAuth();
  const router = useRouter(); // For routing after successful login

  // Initialize react-hook-form with Zod validation
  const { handleSubmit, register, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  // Handle form submission
  const onSubmit = async (data: LoginData) => {
    console.log("Data password:: ",data.password);
    
    try {
      // Attempt to log in the user
      const res = await login({email: data.email,password: data.password});
      console.log(res);
      
      router.push("/dashboard"); // Redirect to dashboard on successful login
    } catch (error) {
      console.error("Login failed:", error); // Handle login failure
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* Left side of the page (login form) */}
      <div className="w-[500px] h-screen bg-slate-50">
        <div className="w-[500px] h-full bg-Bg p-[32px]">
          <div className="mb-[200px]">
            {/* Logo */}
            <Image src={Logo} alt="logo" width={129} height={43.13} />
          </div>
          <div className="w-full">
            {/* Login Form Heading */}
            <p className="text-[24px] font-black mb-[15px] text-BlackSecondary">Login</p>

            {/* Login form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
              {/* Email input field */}
              <div className="w-full">
                <label className="block text-sm font-medium text-BlackSecondary">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-sm h-[49px] p-5 focus:outline-none font-[14px]"
                  {...register("email")} // Register with react-hook-form
                />
                {/* Show error message if validation fails */}
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              {/* Password input field */}
              <div className="w-full">
                <label className="block text-sm font-medium text-BlackSecondary">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-sm h-[49px] p-5 focus:outline-none"
                  {...register("password")} // Register with react-hook-form
                />
                {/* Show error message if validation fails */}
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
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
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right side gradient background */}
      <div className="w-full h-screen bg-gradient-to-b from-[#7D7757] border-l-2"></div>
    </div>
  );
};

export default Page;
