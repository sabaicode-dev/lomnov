
import CreateProperties from '@/components/organisms/add-new-properties/CreateProperties';
import React from 'react'
const page = () => {
  return (
    <div>
      {/*Over view*/}
      <div className="w-[100%] flex justify-between gap-[20px]">
        <CreateProperties />
      </div >
    </div >
  )
}

export default page;