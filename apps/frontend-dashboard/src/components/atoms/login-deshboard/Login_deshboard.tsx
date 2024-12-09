import React from 'react'
import { MdPersonOutline } from "react-icons/md";


const Login_deshboard = () => {
  return (
    <div className='w-[100%] h-[84px] bg-BgSoftWhite rounded-xls flex justify-start items-center p-[12px] gap-[20px]'>
        <div  className='w-[42px] h-[42px] text-BgSoftWhite flex items-center justify-center bg-Black font-[14px] rounded-full'><MdPersonOutline className='text-[16px]'/></div>
        <div className='flex flex-col '><p className='dm-sans-bold text-BlackSecondary'>Welcome ,Admin</p><p className='text-[14px] text-BlackSecondary dm-sans-normal'>Sign out</p></div>
    </div>
  )
}

export default Login_deshboard;