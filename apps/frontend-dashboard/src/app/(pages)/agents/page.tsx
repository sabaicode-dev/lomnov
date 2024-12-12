import React from "react";
import FromGrud from "@/components/molecules/form-grud/From_grud";
import agents from "@/libs/const/agents";
import Pagenation from '@/components/molecules/pagenation/Pagenation'
import Item_agents from "@/components/molecules/item_agengs/Item_agents";

const dataFromAgents = {
  data_list : "Agents List",
  name_data : "Agents",
  url : "/add_agents",
  addnew : "+ New Agent",
  namedata : "Agents",
  data1 : "Address",
  data2 : "Email",
  data3 : "Contact",
  data4 : "Joined Date"
}

const page = () => {
  return (
    <div>
      <p className="text-[30px] font-black ">Agentss</p>
      
      <div>
        <FromGrud item={dataFromAgents} />
        {agents.length > 0 ? (
          <div className=" overflow-auto w-[100%] h-[280px]">
            {agents.map((items) => {
              return <Item_agents item={items} key={items.id} />;
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
