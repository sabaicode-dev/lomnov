import React from "react";

const FormLogin = () => {
  return (
    <>
      <form>
        <input
          type="text"
          placeholder="email"
          className="w-full px-2 mb-5 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent"
        />
        <input
          type="password"
          placeholder="password"
          className="w-full px-2 py-2 mb-5 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent"
        />
        <button className="bg-blue-500 text-white px-5 py-2 w-full rounded-md">
          Login
        </button>
      </form>
    </>
  );
};

export default FormLogin;
