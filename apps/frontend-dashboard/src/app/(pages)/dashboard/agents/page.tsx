"use client";
import ItemAgentList from "@/components/molecules/item-agent-list/ItemAgentList";

const Page = () => {

  return (
    <>
      <p className="text-[30px] font-black ">Agents</p>

      <div>
        <ItemAgentList />
      </div>
    </>
  );
};

export default Page;
