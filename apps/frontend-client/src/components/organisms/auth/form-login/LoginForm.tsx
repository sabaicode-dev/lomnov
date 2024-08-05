"use client";

//**! Old */
// import React, { useState, FormEvent } from "react";
// import Link from "next/link";
// import InputField from "../../../../../../../packages/ui-components/src/components/inputfield/InputField";

// type FormData = {
//   email: string;
//   password: string;
// };

// type FormErrors = {
//   email?: string;
//   password?: string;
// };

// interface LoginFormProps {
//   initialData?: FormData;
//   onSubmit?: (data: FormData) => void;
// }

// const LoginForm: React.FC<LoginFormProps> = ({
//   initialData = { email: "", password: "" },
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState<FormData>(initialData);
//   const [formErrors, setFormErrors] = useState<FormErrors>({});

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   };

//   const validate = (): FormErrors => {
//     const errors: FormErrors = {};
//     if (!formData.email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email is invalid";
//     }
//     if (!formData.password) {
//       errors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       errors.password = "Password must be at least 8 characters long";
//     } else if (!/[A-Z]/.test(formData.password)) {
//       errors.password = "Password must contain at least one uppercase letter";
//     } else if (!/[a-z]/.test(formData.password)) {
//       errors.password = "Password must contain at least one lowercase letter";
//     } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
//       errors.password = "Password must contain at least one special character";
//     }
//     return errors;
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const errors = validate();
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//     } else {
//       if (onSubmit) {
//         onSubmit(formData);
//       }
//       console.log("Form data:", formData);
//       // Clear form after submission
//       setFormData({ email: "", password: "" });
//       setFormErrors({});
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-7">
//       <InputField
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         placeholder="Email"
//         error={formErrors.email}
//         className="w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base"
//       />
//       <InputField
//         name="password"
//         type="password"
//         value={formData.password}
//         onChange={handleInputChange}
//         placeholder="Password"
//         error={formErrors.password}
//         className="w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base"
//       />
//       <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
//         Login
//       </button>
//       <div className="text-center">
//         <span className="text-gray-400">Not yet have an account? </span>
//         <Link href="/signup" className="text-blue-500 font-semibold">
//           Register
//         </Link>
//       </div>
//     </form>
//   );
// };
// export default LoginForm;



//** New */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../../../packages/ui-components/src/components/inputfield/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import  Google  from "../../../../icons/Google";
import  Facebook  from "../../../../icons/Facebook";

// import { Facebook } from "@/icons";

// Define the Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Type definition for form data
type LoginData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // UseForm with Zod schema for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  // Handle form submission
  const onSubmit = (data: LoginData) => {
    console.log("Form data:", data);
    // Implement your form submission logic here
  };

  return (
    <div className="w-full sm:w-[500px]  lg:w-[550px] mx-auto bg-white rounded-[30px] border border-neutral py-10">
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          {/* Email Input */}
          <InputField
            label="Email"
            type="email"
            register={register("email")}
            error={errors.email?.message}
            isFocused={emailFocused}
            setIsFocused={setEmailFocused}
          />

          {/* Password Input */}
          <InputField
            label="Password"
            type={passwordVisible ? "text" : "password"}
            register={register("password")}
            error={errors.password?.message}
            isFocused={passwordFocused}
            setIsFocused={setPasswordFocused}
            hasToggleIcon={true}
            toggleVisibility={togglePasswordVisibility}
            visible={passwordVisible}
          />
        </fieldset>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center mb-8 mx-[45px]">
          <label className="flex items-center text-charcoal">
            <input type="checkbox" className="mr-2" /> Remember Me
          </label>
          <a href="#" className="text-olive-green">
            Forgot Password?
          </a>
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
          <a href="#" className="ml-[10px] text-olive-green">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
