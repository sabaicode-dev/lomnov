import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, User } from "../../schemas/userSchema";
import InputField from "../inputfield/InputField";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (data: User) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-7 w-full sm:w-1/2 md:w-2/5 lg:w-2/5"
    >
      <InputField<User>
        name="email"
        control={control}
        label="Email"
        type="email"
        placeholder="Email"
      />
      <InputField<User>
        name="password"
        control={control}
        label="Password"
        type="password"
        placeholder="Password"
      />
      <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Login
      </button>
      <div className="text-center">
        <span className="text-gray-400">Not yet have an account? </span>
        <Link href="/signup" className="text-blue-500 font-semibold">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
