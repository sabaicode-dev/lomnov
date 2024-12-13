import React from "react";
import FromGrud from "@/components/molecules/form-grud/FromGrud";
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
  return (
    <div>
      <p className="text-[30px] font-black ">Administrator</p>
      
      <div>
        <FromGrud item={dataFromAgents} />
        {administrator.length > 0 ? (
          <div className="">
            {administrator.map((items) => {
              return <ItemAdminstrator item={items} key={items.id} />;
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
