'use client';

import { AiFillAudio } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
const Chatform =  () => {
  return (
    <div >


      {/* Form text message */}
      <div className="absolute inset-x-0 bottom-0 bg-white shadow-inner p-3 flex items-center ">
        <input
          type="text"
          placeholder="Write your message here..."
          className="relative w-full border-none px-4 rounded-[19px] h-[40px] p-2 text-sm focus:outline-none flex-1 bg-gray-200"
        />

          <button type="submit" className=" text-gray-500 absolute right-5 me-3">
            <IoSend className="text-lg"/>
          </button>



      </div>
    </div>
  );
};
export default Chatform;
