import React from 'react'
import Overview_property from '@/components/molecules/overview_property/Overview_property';
import Address_map from '@/components/molecules/address_map/Address_map';
const page = () => {
  return (
    <div>
         <p className="text-[30px] font-black ">Update Property</p>
           <Overview_property/>
           <Address_map/>
           <div className='flex justify-start w-[100%] mt-[20px] items-center gap-[4px]'>
               <button className='px-[12px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg'>Update</button>
               <button className='px-[12px] text-[14px] py-[8px] bg-BgSoftWhite text-black rounded-lg'>Cancel</button>
           </div>
    </div>
  )
}

export default page;