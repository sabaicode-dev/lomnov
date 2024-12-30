import AgentsCustomersOverview from "@/components/molecules/chart-data/ChartData";
import PropertiesOverview from "@/components/molecules/property_overview/Property_overview";
import Totalagentsregister from "@/components/molecules/total-agents-register/Total-agents-register";
import Totalcustomerregister from "@/components/molecules/total-customer-register/Total-customer-register";
import Totalpropertydata from "@/components/molecules/total-property-desbord/Total-property-data";
import { AgentProvider } from "@/context/agent";
import { CustomerProvider } from "@/context/customer";
import { PropertyProvider } from "@/context/property";
import React from "react";
//===================================================

const page = () => {
  return (
    <div className="">
      <p className=" text-[30px] font-black ">Dashboard</p>
      <div className="grid grid-cols-3 gap-[40px]">
        <PropertyProvider>
          <Totalpropertydata />
        </PropertyProvider>

        <AgentProvider>
          <Totalagentsregister />
        </AgentProvider>
        <CustomerProvider>
          <Totalcustomerregister />
        </CustomerProvider>

        <div className="col-span-2">
          <PropertyProvider>
            <PropertiesOverview />
          </PropertyProvider>
          
        </div>
        <AgentProvider>
          <CustomerProvider>
            <AgentsCustomersOverview />
          </CustomerProvider>
        </AgentProvider>
      </div>
    </div>
  );
};

export default page;
