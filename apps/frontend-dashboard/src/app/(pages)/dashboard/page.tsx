import Login_deshboard from '@/components/atoms/login-deshboard/Login_deshboard';
import AgentsCustomersOverview from '@/components/molecules/chart_data/ChartData';
import PropertiesOverview from '@/components/molecules/property_overview/Property_overview';
import Total_Data from '@/components/molecules/total_data/Total_Data';
import React from 'react'


const page = () => {
  return (
    <div className=''>
       <p className='pb-[40px] text-[30px] font-black '>Dashboard</p>
       <Login_deshboard/>
       <div className='flex justify-between gap-[40px]'>
            <Total_Data/>
            <Total_Data/>
            <Total_Data/>
       </div>
       <div className='flex justify-between gap-[40px]'>
          <PropertiesOverview/>
          <AgentsCustomersOverview/>
       </div>
    </div>
  )
}

export default page;