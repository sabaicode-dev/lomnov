
import React from "react";

import AdministratorList from "@/components/molecules/item-administrator-list/AdministratorList";
import { CustomerProvider } from "@/context/customer";



const page = () => {

  return (
    <div>
      <p className="text-[30px] font-black ">Administrator</p>
      
      <div>
      
        <CustomerProvider>
           <AdministratorList/>
        </CustomerProvider>
       
      </div>
    </div>
  );
};

export default page;
