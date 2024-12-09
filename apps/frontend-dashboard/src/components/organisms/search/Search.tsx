import React from "react";
import { IoSearch } from "react-icons/io5";
const Search = () => {
  return (
    <div className="flex items-center bg-white border rounded-lg shadow-sm px-5 w-80">
      <IoSearch className="text-gray-500 w-5 h-5 mr-2 " />
      <input
        type="text"
        placeholder="Search"
        className="w-[200px] h-[42px] bg-transparent outline-none text-gray-600 placeholder-gray-400"
      />
    </div>
  );
};

export default Search;
