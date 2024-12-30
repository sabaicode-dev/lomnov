import React from 'react';
import Image from "next/image";
import Logo from "@/images/lomnov-logo.png";
import Link from 'next/link';

const Login = () => {
  return (
    <div className="2xl:bg-gray-600 w-full h-full">
      <div className="w-[500px] h-[950px] bg-Bg p-[32px] gap-[16px] flex flex-col justify-between">
        <div>
          <Image src={Logo} alt="logo" width={129} height={43.13}  />
        </div>
        <div className='w-[100%]  '>
          {/* Use lowercase `form` for the HTML form element */}
          <p className='text-[24px] font-black mb-[15px] text-BlackSecondary'>Login</p>
          <form className='flex flex-col gap-[20px]'>
            <input type="email" placeholder="Input Email" className='rounded-sm h-[49px] p-5 focus:outline-none font-[14px]' />
            <input type="password" placeholder="Input Password" className='rounded-sm h-[49px] p-5 focus:outline-none'/>
           <div className='flex gap-[10px]'> 
                <input type="checkbox" className='w-[16px] h-[16px] bg-Primary' />
                <label className='text-Black font-[14px]'>Remember me</label>
           </div>
           <Link href={"/deshboard"} className='bg-Primary rounded-sm h-[49px] p-5 flex items-center justify-center font-normal text-BgSoftWhite' >
                  <button type="submit">Login</button>
           </Link> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;