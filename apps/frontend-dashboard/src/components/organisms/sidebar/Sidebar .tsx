import React from 'react'
import { AiOutlineProduct } from "react-icons/ai";
import Property from "@/icons/property.png";
import Image from 'next/image';

const Sidebar  = () => {
  return (
    <div className='w-[243px] h-[900px] bg-slate-500 p-[10px]'>
       <div className='text-BlackSecondary'>
            <div className="flex "><AiOutlineProduct /> <p>Dashboard</p></div>
            <div className="div"> <Image src={Property} alt='property'/>  Properties</div>
            <div className="div">Agents</div>
            <div className="div">Customers</div>
            <div className="div">Administrators</div>
            <div className="div">Account Setting</div>
       </div>
    </div>
  )
}

export default Sidebar;