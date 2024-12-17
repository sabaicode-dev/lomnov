"use client";

import React, { useState } from "react";
import FormAdminHeader from "@/components/molecules/form-admin-header/FormAdminHeader";
import administrator from "@/libs/const/mock/administator";
import Pagenation from '@/components/molecules/pagenation/Pagenation'
import ItemAdminstrator from "@/components/molecules/item-administator/ItemAdminstrator";

const dataFromAgents = {
  data_list : "Administator",
  name_data : "Administrator",
  url : "/dashboard/add-new-administrator",
  addnew : "+ New Administrator",
  namedata : "Administrator",
  data1 : "Email",
  data2 : "Status",
  data3 : "Role",
  data4 : "Create At"
}

const page = () => {
  const [data, setData] = useState(administrator)

  // Handle delete item
  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData); // Update the state with filtered data
  };
  return (
    <div>
      <p className="text-[30px] font-black ">Administrator</p>
      
      <div>
        <FormAdminHeader item={dataFromAgents} />
        {administrator.length > 0 ? (
          <div className="">
            {administrator.map((items) => {
              return <ItemAdminstrator item={items} key={items.id} onDelete={handleDelete} />;
            })}
          </div>
        ) : (
          <p>No Data</p>
        )}
        <Pagenation />
      </div>
    </div>
  );
};

export default page;
