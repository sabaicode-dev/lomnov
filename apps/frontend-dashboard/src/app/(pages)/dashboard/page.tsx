import LoginDashhboard from '@/components/atoms/login-deshboard/LoginDashhboard';
import AgentsCustomersOverview from '@/components/molecules/chart-data/ChartData';
import PropertiesOverview from '@/components/molecules/property_overview/Property_overview';
import TotalData from '@/components/molecules/total-data/TotalData';
import React from 'react'

const page = () => {
  return (
    <div className=''>
       <p className='pb-[40px] text-[30px] font-black '>Dashboard</p>
       <LoginDashhboard/>
       <div className='flex justify-between gap-[40px]'>
            <TotalData/>
            <TotalData/>
            <TotalData/>
       </div>
       <div className='flex justify-between gap-[40px]'>
          <PropertiesOverview/>
          <AgentsCustomersOverview/>
       </div>
    </div>
  )
}

export default page;