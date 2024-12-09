import Data_list from '@/components/molecules/data_list/Data_list'
import From_data_list from '@/components/molecules/from_data_list/From_data_list'
import Total_Data from '@/components/molecules/total_data/Total_Data'
import React from 'react'
import data from '@/libs/const/dataTest'
import Pagenation from '@/components/molecules/pagenation/Pagenation'

const page = () => {
  return (
    <div>
         <p className='text-[30px] font-black '>Property</p>
         <div className='flex justify-between gap-[40px]'>
            <Total_Data/>
            <Total_Data/>
            <Total_Data/>
       </div>
       <div>
            <From_data_list/>
            {data.length > 0 ? 
               (
                <div>
                    {data.map((items) => {
                      return (
                        <Data_list item={items} key={items.id}/>
                      )
                    })}
                </div>
               ):(
                <p>No Data</p>
               )}
              <Pagenation/>
       </div>
    </div>
  )
}

export default page