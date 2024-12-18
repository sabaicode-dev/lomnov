import ItemAgentList from "@/components/molecules/item-agent-list/ItemAgentList";
import { AgentProvider } from "@/context/agent";

const page = () => {
  return (
    <div>
      <p className="text-[30px] font-black ">Agents</p>
      <AgentProvider>
        <ItemAgentList />
      </AgentProvider>
    </div>
  );
};

export default page;
