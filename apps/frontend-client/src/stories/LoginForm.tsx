'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

type FormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
};

export interface LoginFormProps {
  initialEmail?: string;
  initialPassword?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  emailErrorMessage?: string;
  passwordErrorMessage?: string;
  loginButtonText?: string;
  registerText?: string;
  registerLink?: string;
  containerClasses?: string;
  inputClasses?: string;
  buttonClasses?: string;
  linkClasses?: string;
  errorClasses?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  initialEmail = '',
  initialPassword = '',
  emailPlaceholder = 'Email',
  passwordPlaceholder = 'Password',
  emailErrorMessage = 'Email is required',
  passwordErrorMessage = 'Password must be at least 8 characters long',
  loginButtonText = 'Login',
  registerText = 'Not yet have an account?',
  registerLink = '/signup',
  containerClasses = 'space-y-7 w-full sm:w-1/2 md:w-2/5 lg:w-2/5',
  inputClasses = 'w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base',
  buttonClasses = 'bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600',
  linkClasses = 'text-blue-500 font-semibold',
  errorClasses = 'text-red-500 text-sm absolute -left-[0%] top-11',
}) => {
  const [formData, setFormData] = useState<FormData>({ email: initialEmail, password: initialPassword });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.email) {
      errors.email = emailErrorMessage;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = passwordErrorMessage;
    }
    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      console.log('Form data:', formData);
      setFormData({ email: '', password: '' });
      setFormErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className={containerClasses}>
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder={emailPlaceholder}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClasses}
        />
        {formErrors.email && (
          <span className={errorClasses}>
            {formErrors.email}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type="password"
          name="password"
          placeholder={passwordPlaceholder}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={inputClasses}
        />
        {formErrors.password && (
          <span className={errorClasses}>
            {formErrors.password}
          </span>
        )}
      </div>
      <button className={buttonClasses}>
        {loginButtonText}
      </button>
      <div className="text-center">
        <span className="text-gray-400">{registerText} </span>
        <Link href={registerLink}>
          <p className={linkClasses}>Register</p>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
