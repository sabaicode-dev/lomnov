import React from 'react'
import GeneralInfo from '@/components/molecules/general_info/GeneralInfo';
import Photo_Attachment from '@/components/molecules/photo_Attachment/Photo_Attachment';
import AddressMap from '@/components/molecules/address_map/Address_map';
import Status from '@/components/molecules/status/Status';
const page = () => {
  return (
    <div>
       <p className="text-[30px] font-black ">New Agents</p>
        <GeneralInfo/>
        <Photo_Attachment/>
        <AddressMap/>
        <Status/>
    </div>
  )
}

export default page;