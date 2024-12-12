import React from "react";
import FromGrud from "@/components/molecules/form-grud/FromGrud";
import agents from "@/libs/const/agents";
import Pagenation from '@/components/molecules/pagenation/Pagenation'
import ItemAgents from "@/components/molecules/item_agengs/ItemAgents";

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
      <p className="text-[30px] font-black ">Agents</p>
      
      <div>
        <FromGrud item={dataFromAgents} />
        {agents.length > 0 ? (
          <div className="">
            {agents.map((items) => {
              return <ItemAgents item={items} key={items.id} />;
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
