"use client";

import React, { useState, FormEvent } from "react";

type FormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
};

const LoginForm: React.FC = () => {
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
    <>
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
    </>
  );
};

export default LoginForm;
