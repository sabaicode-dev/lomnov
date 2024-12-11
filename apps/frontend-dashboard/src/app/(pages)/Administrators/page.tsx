import React from "react";
import FromGrud from "@/components/molecules/form-grud/From_grud";
import administrator from "@/libs/const/administator";
import Pagenation from '@/components/molecules/pagenation/Pagenation'
import ItemAdminstrator from "@/components/molecules/item_administator/ItemAdminstrator";

const dataFromAgents = {
  data_list : "Administator",
  name_data : "Administrator",
  url : "/add_new_administrator",
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
          <div className=" overflow-auto w-[100%] h-[280px]">
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
