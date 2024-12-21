import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AgentResponseType } from "@/libs/types/api-agents/agent-response";
import { formatDate } from "@/libs/functions/formatDate";
import CardUser from "@/components/atoms/card-user/CardUser";
import CardEmail from "@/components/atoms/card-email/CardEmail";
import CardDate from "@/components/atoms/card-date/CardDate";
import Link from "next/link";
import { toSubstring } from "@/libs/functions/toSubstring";

//==================================
interface PropType {
  item: AgentResponseType;
}

const ItemAgents = ({ item }: PropType) => {

  return (
    <div className="w-full h-[68px] px-3 py-2 flex justify-between border bg-BgSoftWhite/50 border-Primary/10">
      <div className="flex justify-start items-center w-1/5 gap-10">
        <p>{toSubstring(item._id, 4)}</p>
        <CardUser usernname={item.userName} image={item.profile[0]} />
      </div>
      <div className="flex justify-between items-center w-[65%]">
        <div className="w-[200px] flex justify-start items-center">
          <p>{toSubstring(item.address,30)}</p>
        </div>
        <CardEmail email={item.email} />
        <div className="w-[200px] flex justify-start">
          <p>{item.phoneNumber}</p>
        </div>
        <CardDate datetime={formatDate(item.updatedAt)} />
      </div>
      <div className="flex items-center justify-around gap-[5px] w-[5%]">
        <Link href={`/dashboard/view-agents/${item._id}`}>
        <div className="p-1 w-8 h-8 bg-Primary/20 rounded cursor-pointer hover:bg-Primary/40 transition duration-200 flex items-center justify-center">
          <MdOutlineRemoveRedEye className="text-lg text-Primary hover:text-PrimaryDark transition duration-200" />
        </div>
        </Link>
      </div>
    </div>
  );
};

export default ItemAgents;
