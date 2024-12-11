import Address_map from '@/components/molecules/address_map/Address_map';
import Overview_property from '@/components/molecules/overview_property/Overview_property';
import React from 'react'


const page = () => {
  return (
    <div>
           <p className="text-[30px] font-black ">New Property</p>
           <Overview_property/>
           <Address_map/>
           <div className='flex justify-start w-[100%] mt-[20px] items-center gap-[4px]'>
               <button className='px-[12px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg'>Create</button>
               <button className='px-[12px] text-[14px] py-[8px] bg-BgSoftWhite text-black rounded-lg'>Cancel</button>
           </div>
    </div>
  )
}

export default page;