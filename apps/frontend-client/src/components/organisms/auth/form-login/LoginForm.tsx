// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import Link from "next/link";
// import axiosInstance from "@/libs/axios";
// import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
// import { Google, Facebook } from "@/icons";
// import InputField from "ms-ui-components/src/components/inputfield/InputField";
// import withAuthRedirect from '../withAuth';

// // Define the Zod schema
// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters long"),
// });

// type LoginData = z.infer<typeof loginSchema>;

// const LoginForm: React.FC = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginData) => {
//     try {
//       const response = await axiosInstance.post(API_ENDPOINTS.SIGN_IN, {
//         email: data.email,
//         password: data.password,
//       })
//       console.log('response', response)
//       if (response.status === 200) {
//         window.location.href = "/"
//       }
//     } catch (error: any) {
//       console.error("Login failed:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="w-full sm:w-[500px] lg:w-[550px] mx-auto bg-white rounded-[30px] border border-neutral py-10">
//       {/* Title */}
//       <div className="text-center">
//         <h2 className="font-coolvetica text-helvetica-h2 text-charcoal tracking-coolvetica-tight mb-4">
//           Login to your account
//         </h2>
//         <p className="mb-6 text-charcoal font-helvetica text-helvetica-text">
//           Please enter your credentials to continue.
//         </p>
//       </div>

//       {/* Social Login Buttons */}
//       <div className="flex justify-center mb-8 space-x-4 mx-[45px] font-helvetica text-helvetica-h4">
//         <button className="flex items-center justify-center w-1/2 h-[50px] border border-charcoal hover:border-olive-green rounded-[15px]">
//           <Google props="w-5 h-5 mr-2" />
//           Google
//         </button>
//         <button className="flex items-center justify-center w-1/2 h-[50px] border border-charcoal hover:border-olive-green rounded-[15px]">
//           <Facebook props="w-5 h-5 mr-2" />
//           Facebook
//         </button>
//       </div>

//       <div className="flex items-center mb-8 mx-[45px]">
//         <div className="flex-grow h-px bg-charcoal"></div>
//         <span className="px-2 text-charcoal font-helvetica text-helvetica-text">
//           or continue with email
//         </span>
//         <div className="flex-grow h-px bg-charcoal"></div>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <fieldset>
//           {/* Email Input */}
//           <InputField
//             label="Email"
//             type="email"
//             register={register("email")}
//             error={errors.email?.message}
//             isFocused={emailFocused}
//             setIsFocused={setEmailFocused}
//           />

//           {/* Password Input */}
//           <InputField
//             label="Password"
//             type={passwordVisible ? "text" : "password"}
//             register={register("password")}
//             error={errors.password?.message}
//             isFocused={passwordFocused}
//             setIsFocused={setPasswordFocused}
//             hasToggleIcon={true}
//             toggleVisibility={togglePasswordVisibility}
//             visible={passwordVisible}
//           />
//         </fieldset>

//         {/* Remember Me and Forgot Password */}
//         <div className="flex justify-between items-center mb-8 mx-[45px]">

//           <Link href="/forgot-password" className="text-olive-green">
//             Forgot Password?
//           </Link>
//         </div>

//         {/* Sign In Button */}
//         <div className="mx-[45px] mb-4">
//           <button
//             type="submit"
//             className="w-full h-[50px] font-helvetica text-helvetica-h5 font-bold bg-neutral hover:bg-olive-green text-white rounded-[15px]"
//           >
//             Sign In
//           </button>
//         </div>
//       </form>

//       {/* Signup Link */}
//       <div className="text-center font-helvetica text-helvetica-text mt-4">
//         <p className="text-charcoal">
//           Do not have an account?
//           <a href="/signup" className="ml-[10px] text-olive-green">
//             Create an account
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default withAuthRedirect(LoginForm);


"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { Google, Facebook } from "@/icons";
import InputField from "ms-ui-components/src/components/inputfield/InputField";
import withAuthRedirect from '../withAuth';

// Define the Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null,
  )
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(
    null,
  )



  const inputRefs = useRef<( HTMLImageElement | null )[]>([])

  useEffect(()=>{
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  },[]);



  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.SIGN_IN, {
        email: data.email,
        password: data.password,
      });
      console.log('response', response);
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error: any) {
      if (error.response){
        setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
        console.error("Login failed:", error.response?.data || error.message);

      }else{
        setErrorMessage("Something went wrong. Please try again.");
      }

      if(error.response){
        const emailErrorMessage = error.response.data.message || "Email not found. Please try again.";
        setEmailErrorMessage(emailErrorMessage);
        inputRefs.current[0]?.focus(); // Focus on email input if incorrect
      }else if (error.response) {
        setEmailErrorMessage("Email not found. Please try again.");
      }


      if(error.response){
        const passwordErrorMessage = error.response.data.message || "Incorrect password. Please try again.";
        setPasswordErrorMessage(passwordErrorMessage);
        inputRefs.current[1]?.focus(); // Focus on password input if incorrect
      }else if (error.response) {
        setPasswordErrorMessage("Incorrect password. Please try again.");
      }





    }
  };

  return (
    <div className="w-full sm:w-[500px] lg:w-[550px] mx-auto bg-white rounded-[30px] border border-neutral py-10">
      {/* Title */}
      <div className="text-center">
        <h2 className="font-coolvetica text-helvetica-h2 text-charcoal tracking-coolvetica-tight mb-4">
          Login to your account
        </h2>
        <p className="mb-6 text-charcoal font-helvetica text-helvetica-text">
          Please enter your credentials to continue.
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="flex justify-center mb-8 space-x-4 mx-[45px] font-helvetica text-helvetica-h4">
        <button className="flex items-center justify-center w-1/2 h-[50px] border border-charcoal hover:border-olive-green rounded-[15px]">
          <Google props="w-5 h-5 mr-2" />
          Google
        </button>
        <button className="flex items-center justify-center w-1/2 h-[50px] border border-charcoal hover:border-olive-green rounded-[15px]">
          <Facebook props="w-5 h-5 mr-2" />
          Facebook
        </button>
      </div>

      <div className="flex items-center mb-8 mx-[45px]">
        <div className="flex-grow h-px bg-charcoal"></div>
        <span className="px-2 text-charcoal font-helvetica text-helvetica-text">
          or continue with email
        </span>
        <div className="flex-grow h-px bg-charcoal"></div>
      </div>

      {/* Error Message */}
      {errorMessage && (
          <div className="text-red-500 text-center mx-[45px] mb-4">
            {errorMessage}
          </div>
        )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          {/* Email Input */}
          <InputField
            label="Email"
            type="email"
            register={register("email")}
            error={emailErrorMessage || errors.email?.message}
            isFocused={emailFocused}
            setIsFocused={setEmailFocused}
          />

          {/* Password Input */}
          <InputField
            label="Password"
            type={passwordVisible ? "text" : "password"}
            register={register("password")}
            error={ passwordErrorMessage || errors.password?.message}
            isFocused={passwordFocused}
            setIsFocused={setPasswordFocused}
            hasToggleIcon={true}
            toggleVisibility={togglePasswordVisibility}
            visible={passwordVisible}
          />
        </fieldset>



        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center mb-8 mx-[45px]">
          <Link href="/forgot-password" className="text-olive-green">
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <div className="mx-[45px] mb-4">
          <button
            type="submit"
            className="w-full h-[50px] font-helvetica text-helvetica-h5 font-bold bg-neutral hover:bg-olive-green text-white rounded-[15px]"
          >
            Sign In
          </button>
        </div>
      </form>

      {/* Signup Link */}
      <div className="text-center font-helvetica text-helvetica-text mt-4">
        <p className="text-charcoal">
          Do not have an account?
          <a href="/signup" className="ml-[10px] text-olive-green">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default withAuthRedirect(LoginForm);





// "use client";

// import React, { useState, useRef, useEffect, forwardRef } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import Link from "next/link";
// import axiosInstance from "@/libs/axios";
// import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
// import { Google, Facebook } from "@/icons";
// import withAuthRedirect from "../withAuth";

// // Define the Zod schema
// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters long"),
// });

// type LoginData = z.infer<typeof loginSchema>;

// // Modify InputField to accept a ref directly
// type InputFieldProps = {
//   label: string;
//   type: string;
//   error?: string;
//   isFocused?: boolean;
//   hasToggleIcon?: boolean;
//   toggleVisibility?: () => void;
//   visible?: boolean;
//   register: any; // Adjust this type based on your form library or requirements
// };

// const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
//   ({ label, type, error, isFocused, hasToggleIcon, toggleVisibility, visible, register }, ref) => {
//     return (
//       <div>
//         <label>{label}</label>
//         <input
//           type={type}
//           ref={ref} // Attach the ref here
//           {...register} // Spread other register-related properties here
//           className={`input-field ${error ? 'border-red-500' : ''}`} // Example styling
//         />
//         {hasToggleIcon && toggleVisibility && (
//           <button type="button" onClick={toggleVisibility}>
//             {visible ? "Hide" : "Show"}
//           </button>
//         )}
//         {error && <p className="text-red-500">{error}</p>}
//       </div>
//     );
//   }
// );

// InputField.displayName = "InputField"; // For debugging purposes with forwardRef components

// const LoginForm: React.FC = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

//   const emailInputRef = useRef<HTMLInputElement>(null);
//   const passwordInputRef = useRef<HTMLInputElement>(null);

//   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginData>({
//     resolver: zodResolver(loginSchema),
//   });

//   useEffect(() => {
//     // Automatically focus on the email input when the component mounts
//     emailInputRef.current?.focus();
//   }, []);

//   const onSubmit = async (data: LoginData) => {
//     try {
//       const response = await axiosInstance.post(API_ENDPOINTS.SIGN_IN, {
//         email: data.email,
//         password: data.password,
//       });
//       if (response.status === 200) {
//         window.location.href = "/";
//       }
//     } catch (error: any) {
//       setErrorMessage(
//         error.response?.data?.message || "Something went wrong. Please try again."
//       );
//       if (error.response) {
//         if (error.response.data.field === "email") {
//           setEmailErrorMessage("Email not found. Please try again.");
//           passwordInputRef.current?.focus(); // Focus password if email is correct but password is incorrect
//         } else if (error.response.data.field === "password") {
//           setPasswordErrorMessage("Incorrect password. Please try again.");
//           passwordInputRef.current?.focus();
//         }
//       }
//     }
//   };

//   return (
//     <div className="w-full sm:w-[500px] lg:w-[550px] mx-auto bg-white rounded-[30px] border border-neutral py-10">
//       {/* Title */}
//       <div className="text-center">
//         <h2 className="font-coolvetica text-helvetica-h2 text-charcoal tracking-coolvetica-tight mb-4">
//           Login to your account
//         </h2>
//         <p className="mb-6 text-charcoal font-helvetica text-helvetica-text">
//           Please enter your credentials to continue.
//         </p>
//       </div>

//       {/* Social Login Buttons */}
//       <div className="flex justify-center mb-8 space-x-4 mx-[45px] font-helvetica text-helvetica-h4">
//         <button className="flex items-center justify-center w-1/2 h-[50px] border border-charcoal hover:border-olive-green rounded-[15px]">
//           <Google props="w-5 h-5 mr-2" />
//           Google
//         </button>
//         <button className="flex items-center justify-center w-1/2 h-[50px] border border-charcoal hover:border-olive-green rounded-[15px]">
//           <Facebook props="w-5 h-5 mr-2" />
//           Facebook
//         </button>
//       </div>

//       <div className="flex items-center mb-8 mx-[45px]">
//         <div className="flex-grow h-px bg-charcoal"></div>
//         <span className="px-2 text-charcoal font-helvetica text-helvetica-text">
//           or continue with email
//         </span>
//         <div className="flex-grow h-px bg-charcoal"></div>
//       </div>

//       {/* Error Message */}
//       {errorMessage && (
//         <div className="text-red-500 text-center mx-[45px] mb-4">
//           {errorMessage}
//         </div>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <fieldset>
//           {/* Email Input */}
//           <InputField
//             label="Email"
//             type="email"
//             ref={emailInputRef} // Pass ref directly here
//             register={register("email")}
//             error={emailErrorMessage || errors.email?.message}
//             isFocused={true}
//           />

//           {/* Password Input */}
//           <InputField
//             label="Password"
//             type={passwordVisible ? "text" : "password"}
//             ref={passwordInputRef} // Pass ref directly here
//             register={register("password")}
//             error={passwordErrorMessage || errors.password?.message}
//             isFocused={false}
//             hasToggleIcon={true}
//             toggleVisibility={togglePasswordVisibility}
//             visible={passwordVisible}
//           />
//         </fieldset>

//         {/* Remember Me and Forgot Password */}
//         <div className="flex justify-between items-center mb-8 mx-[45px]">
//           <Link href="/forgot-password" className="text-olive-green">
//             Forgot Password?
//           </Link>
//         </div>

//         {/* Sign In Button */}
//         <div className="mx-[45px] mb-4">
//           <button
//             type="submit"
//             className="w-full h-[50px] font-helvetica text-helvetica-h5 font-bold bg-neutral hover:bg-olive-green text-white rounded-[15px]"
//           >
//             Sign In
//           </button>
//         </div>
//       </form>

//       {/* Signup Link */}
//       <div className="text-center font-helvetica text-helvetica-text mt-4">
//         <p className="text-charcoal">
//           Do not have an account?
//           <a href="/signup" className="ml-[10px] text-olive-green">
//             Create an account
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default withAuthRedirect(LoginForm);
