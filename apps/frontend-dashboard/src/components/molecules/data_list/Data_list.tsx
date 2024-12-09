import React from 'react'
import Image, { StaticImageData } from 'next/image';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

//==================================
interface ItemData {
    id : number;
    img : string | StaticImageData;
    name : string;
    sale : string;
    category : string;
    location: string;
    price : number;
}


interface PropType {
  item : ItemData;
}

const Data_list =({item}:PropType) => {
  return (
    <div className='w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] border-Primary/30'>
        <div className='flex justify-start items-center w-[20%] gap-[40px]'>
              <p>{item.id}</p>
             <div className='flex justify-start gap-[20px]'>
                <Image src={item.img} alt='img' width={32} height={32}></Image>
                <p>{item.name}</p>
             </div>

        </div>
        <div className='flex justify-between items-center w-[60%]'>
            <div className='w-[200px] flex justify-start' ><p className='text-Positive px-[4px] bg-Positive/20 rounded-[4px] border-[0.3px] border-Positive'>{item.sale}</p></div>
           <div className='w-[200px] flex justify-start'> <p>{item.category}</p></div>
            <div className='w-[200px] flex justify-start'><p>{item.location}</p></div>
            <div  className='w-[200px] flex justify-start'> <p>{item.price}</p></div>
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

export default Data_list;