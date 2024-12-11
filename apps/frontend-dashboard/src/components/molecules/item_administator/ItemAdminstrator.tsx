import React from 'react'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image , {StaticImageData} from 'next/image';


//==================================
type ItemData = {
    id: number;
    img: string | StaticImageData; // Assuming img is a string for file paths
    email : string;
    name: string;
    status: string;
    role: string; // Match your data's structure
    create_at: string;
  };


interface PropType {
  item : ItemData;
}

const ItemAdminstrator =({item}:PropType) => {
  return (
    <div className='w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] bg-BgSoftWhite/50 border-Primary/10'>
        <div className='flex justify-start items-center w-[20%] gap-[40px]'>
              <p>{item.id}</p>
             <div className='flex justify-start gap-[20px]'>
                <Image src={item.img} alt='img' width={32} height={32}></Image>
                <p>{item.name}</p>
             </div>

        </div>
        <div className='flex justify-between items-center w-[60%]'>
            <div className='w-[200px] flex justify-start' ><p>{item.email}</p></div>
            <div className='w-[200px] flex justify-start' >{item.status === "Active" ? (<p className=" bg-Negative/20  text-Negative px-[4px] border-2 border-Negative/20 rounded-[6px]">{item.status}</p>) : (<p className="bg-Positive/20 text-Positive px-[4px] border-2 border-Positive/20 rounded-[6px]">{item.status}</p>)}</div>
           <div className='w-[200px] flex justify-start'> <p className=' bg-Positive/20   text-Positive px-[4px]  rounded-[6px] px-[4px] border-2 border-Positive/20'>{item.role}</p></div>
            <div className='w-[200px] flex justify-start'><p>{item.create_at}</p></div>
         
        </div>
        <div className='flex items-center justify-between gap-[10px] w-[10%]'>
             <div className='p-[4px] w-[24px] h-[24px]  bg-Primary/20 rounded-[6px]'>
               <MdOutlineRemoveRedEye className='text-[16px] text-Primary'/>
             </div>
             <div className='p-[4px] w-[24px] h-[24px]  bg-Positive/20 rounded-[6px]'>
               <LuPencilLine className='text-[16px] text-Positive'/>
             </div>
             <div className='p-[4px] w-[24px] h-[24px]  bg-Negative/20 rounded-[6px]'>
               <RiDeleteBin6Line className='text-[16px] text-Negative'/>
             </div>
        </div>
    </div>
  )
}

export default ItemAdminstrator;


