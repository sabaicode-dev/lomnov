"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import InputField from "../../../../../../../packages/ui-components/src/components/inputfield/InputField";

type FormData = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};

type FormErrors = {
  fullname?: string;
  username?: string;
  email?: string;
  password?: string;
};

interface LoginFormProps {
  initialData?: FormData;
  onSubmit?: (data: FormData) => void;
}

const SignupForm: React.FC<LoginFormProps> = ({
  initialData = { username: "", fullname: "", email: "", password: "" },
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.fullname) {
      errors.fullname = "Full name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = "Password must contain at least one special character";
    }
    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      if (onSubmit) {
        onSubmit(formData);
      }
      console.log("Form data:", formData);
      // Clear form after submission
      setFormData({ username: "", fullname: "", email: "", password: "" });
      setFormErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <InputField
        name="username"
        type="text"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="User name"
        error={formErrors.username}
        className="w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base"
      />
      <InputField
        name="fullname"
        type="text"
        value={formData.fullname}
        onChange={handleInputChange}
        placeholder="Full name"
        error={formErrors.fullname}
        className="w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base"
      />
      <InputField
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        error={formErrors.email}
        className="w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base"
      />
      <InputField
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
        error={formErrors.password}
        className="w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base"
      />
      <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Login
      </button>
      <div className="text-center">
        <span className="text-gray-400">Not yet have an account? </span>
        <Link href="/signin" className="text-blue-500 font-semibold">
          Signin
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
