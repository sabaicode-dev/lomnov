"use client";
import React from "react";
import FromGrud from "@/components/molecules/form-grud/FromGrud";
import agents from "@/libs/const/agents";
import Pagenation from '@/components/molecules/pagenation/Pagenation'
import ItemAgents from "@/components/molecules/item-agengs/ItemAgents";
import { useState } from "react";

const dataFromAgents = {
  data_list : "Agents",
  name_data : "Agents",
  url : "/add-new-agents",
  addnew : "+ New Agent",
  namedata : "Agents",
  data1 : "Address",
  data2 : "Email",
  data3 : "Contact",
  data4 : "Joined Date"
}

const Page = () => {

  const [data, setData] = useState(agents);

  // Handle delete item
  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData); // Update the state with filtered data
  };


  return (
    <div>
      <p className="text-[30px] font-black ">Agents</p>
      
      <div>
        <FromGrud item={dataFromAgents} />
        {data.length > 0 ? (
          <div className="">
            {data.map((item) => {
              return (
                <ItemAgents
                  onDelete={handleDelete} // Pass the delete function here
                  item={item}
                  key={item.id}
                />
              );
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

export default Page;
