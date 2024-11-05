// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import InputField from "../../../../../../../packages/ui-components/src/components/inputfield/InputField";
// import axios from "axios";

// // Define the Zod schema
// const signupSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   username: z.string().min(1, "Username is required"),
//   password: z.string().min(8, "Password must be at least 8 characters long"),
// });

// // Type definition for form data
// type SignupData = z.infer<typeof signupSchema>;

// const SignupForm: React.FC = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [userNameFocused, setUserNameFocused] = useState(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignupData>({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = async (data: SignupData) => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL_AUTH}/auth/signup`,
//         {
//           email: data.email,
//           username: data.username,
//           password: data.password,
//         },
//       );

//       // Handle success - redirect to verification page
//       if (response.status === 200) {
//         window.location.href = `/verify?email=${encodeURIComponent(data.email)}`;
//       }
//     } catch (error) {
//       console.error("Signup failed:", error);
//       setErrorMessage("Signup failed. Please try again.");
//     }
//   };
//   return (
//     <div className="max-w-[600px] mx-auto bg-white rounded-[30px] border border-neutral py-10">
//       {/* Title */}
//       <div className="text-center">
//         <h2 className="font-coolvetica text-helvetica-h2 text-charcoal tracking-coolvetica-tight mb-4">
//           Register Form
//         </h2>
//         <p className="mb-6 text-charcoal font-helvetica text-helvetica-text">
//           Please fill in the details to create an account.
//         </p>
//       </div>

//       <div className="flex items-center mb-4 mx-[45px]">
//         <div className="flex-grow h-px bg-charcoal"></div>
//         <span className="px-2 text-charcoal font-helvetica text-helvetica-text">
//           Welcome
//         </span>
//         <div className="flex-grow h-px bg-charcoal"></div>
//       </div>

//       {errorMessage && (
//         <p className="text-red-500 text-center mb-4">{errorMessage}</p>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <fieldset>
//             <InputField
//             label="Email"
//             type="email"
//             register={register("email")}
//             error={errors.email?.message}
//             isFocused={emailFocused}
//             setIsFocused={setEmailFocused}
//           />
//           <InputField
//             label="Username"
//             type="text"
//             register={register("username")}
//             error={errors.username?.message}
//             isFocused={userNameFocused}
//             setIsFocused={setUserNameFocused}
//           />
//           <InputField
//             label="Password"
//             type={passwordVisible ? "text" : "password"}
//             register={register("password")}
//             error={errors.password?.message}
//             isFocused={focusedField === "password"}
//             setIsFocused={() => setFocusedField("password")}
//             hasToggleIcon={true}
//             toggleVisibility={togglePasswordVisibility}
//             visible={passwordVisible}
//           />
//         </fieldset>

//         <div className="mx-[45px] mb-4">
//           <button
//             type="submit"
//             className="w-full h-[50px] font-helvetica text-helvetica-h5 font-bold bg-neutral hover:bg-olive-green text-white rounded-[15px]"
//           >
//             Register
//           </button>
//         </div>
//       </form>

//       <div className="text-center font-helvetica text-helvetica-text mt-4">
//         <p className="text-charcoal">
//           Already have an account?
//           <a href="/signin" className="ml-[10px] text-olive-green">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../../../../../packages/ui-components/src/components/inputfield/InputField";
import axios from "axios";

// Define the Zod schema
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Type definition for form data
type SignupData = z.infer<typeof signupSchema>;

const SignupForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [userNameFocused, setUserNameFocused] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null,
  );
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<
    string | null
  >(null);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_AUTH}/auth/signup`,
        {
          email: data.email,
          username: data.username,
          password: data.password,
        },
      );

      if (response.status === 200) {
        window.location.href = `/verify?email=${encodeURIComponent(data.email)}`;
      }
    } catch (error: any) {
      if (error.response) {
        // Custom error handling based on server response
        const errorMessage =
          error.response.data.message || "Signup failed. Please try again.";
          setErrorMessage(errorMessage);
        // Check for specific messages from the server

      } else {
        setErrorMessage("Signup failed. Please try again.");
      }

      if (error.response) {
        // Custom error handling based on server response
        const emailErrorMessage =
          error.response.data.message || "Email already registered. Please try again.";
          setEmailErrorMessage(emailErrorMessage);
        // Check for specific messages from the server

      } else {
        setEmailErrorMessage("Email already registered. Please try again.");
      }

      if(error.response) {
        const usernameErrorMessage =
          error.response.data.message || "Username already taken. Please try again.";
          setUsernameErrorMessage(usernameErrorMessage);
        // Check for specific messages from the server
      }else{
        setUsernameErrorMessage("Username already taken. Please try again.");
      }

    }
  };

  return (
    <div className="max-w-[600px] mx-auto bg-white rounded-[30px] border border-neutral py-10">
      {/* Title */}
      <div className="text-center">
        <h2 className="font-coolvetica text-helvetica-h2 text-charcoal tracking-coolvetica-tight mb-4">
          Register Form
        </h2>
        <p className="mb-6 text-charcoal font-helvetica text-helvetica-text">
          Please fill in the details to create an account.
        </p>
      </div>

      <div className="flex items-center mb-2 mx-[45px]">
        <div className="flex-grow h-px bg-charcoal"></div>
        <span className="px-2 text-charcoal font-helvetica text-helvetica-text mb-5">
          Welcome
        </span>
        <div className="flex-grow h-px bg-charcoal"></div>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <InputField
            label="Email"
            type="email"
            register={register("email")}
            error={emailErrorMessage || errors.email?.message}
            isFocused={emailFocused}
            setIsFocused={setEmailFocused}
          />
          {/* {emailErrorMessage && (
        <p className="text-red-500 text-center mb-4">{emailErrorMessage}</p>
      )} */}

          <InputField
            label="Username"
            type="text"
            register={register("username")}
            error={usernameErrorMessage || errors.username?.message}
            isFocused={userNameFocused}
            setIsFocused={setUserNameFocused}
          />
          {/* {usernameErrorMessage && (
        <p className="text-red-500 text-center mb-4">{usernameErrorMessage}</p>
      )} */}

          <InputField
            label="Password"
            type={passwordVisible ? "text" : "password"}
            register={register("password")}
            error={errors.password?.message}
            isFocused={focusedField === "password"}
            setIsFocused={() => setFocusedField("password")}
            hasToggleIcon={true}
            toggleVisibility={togglePasswordVisibility}
            visible={passwordVisible}
          />
        </fieldset>

        <div className="mx-[45px] mb-4">
          <button
            type="submit"
            className="w-full h-[50px] font-helvetica text-helvetica-h5 font-bold bg-olive-green hover:bg-neutral text-white rounded-[15px]"
          >
            Register
          </button>
        </div>
      </form>

      <div className="text-center font-helvetica text-helvetica-text mt-4">
        <p className="text-charcoal">
          Already have an account?
          <a href="/signin" className="ml-[10px] text-olive-green">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;

