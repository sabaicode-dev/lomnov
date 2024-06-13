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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;

  }

};

export default LoginForm;
