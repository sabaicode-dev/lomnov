import React from 'react'
import Photo_Attachment from '@/components/molecules/photo_Attachment/Photo_Attachment';
import AddressMap from '@/components/molecules/address-map/AddressMap';
import Status from '@/components/molecules/status/Status';
import GeneralInfo from '@/components/molecules/general_info/GeneralInfo';

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