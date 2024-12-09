import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


const Pagenation = () => {
  return (
    <div className='w-[100%] flex justify-between h-[67px] p-[10px]'>
        <div className='flex items-center text-Black'><p>Showing 1 to 3 of 3 results</p></div>
        <div className='flex items-center justify-between'><button>10</button>  <IoIosArrowDown /><p>per page</p></div>
        <div><button>1</button><IoIosArrowForward /></div>   
    </div>
  )
}

export default Pagenation;