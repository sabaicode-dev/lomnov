import React from 'react'
import PhotoAttachmentViewUser from '@/components/molecules/photo-attach-view-user/PhotoAttachmentViewUser';
import axiosInstance from '@/libs/axios';
import { API_ENDPOINTS } from '@/libs/const/api-endpionts';
import StatusAgent from '@/components/molecules/status-agent/StatusAgent';
import Default_Profile from "@/images/default-profile.jpg";
import OverviewAgent from '@/components/molecules/over-view-agents/OverviewAgent';
import { AgentResponseType } from '@/libs/types/api-agents/agent-response';
import Link from 'next/link';

//======================
async function fetchAgents(username: string): Promise<AgentResponseType | null> {
  try {
    const response = await axiosInstance.get(`${API_ENDPOINTS.USER}`);
    console.log("API Agent Response:", response.data);

    // Decode the username and filter for the user
    const decodedUsername = decodeURIComponent(username);
    const user = response.data.users.find(
      (user: AgentResponseType) => user.userName === decodedUsername
    );

    if (!user) {
      console.warn(`User with username "${decodedUsername}" not found.`);
      return null;
    }

    // Assign a default profile image if none exists
    if (!user.profile || user.profile.length === 0) {
      user.profile = [Default_Profile.src];
    }

    return user; // Return the user with a default profile if necessary
  } catch (error) {
    console.error("Error fetching agent details:", error);
    throw error;
  }
}


const page = async ({ params }: { params: { username: string } }) => {
  const agent = await fetchAgents(params.username);

  if (!agent) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-red-500">Customer not found.</p>
        <Link href="/dashboard/customers">
          <button className="mt-4 px-4 py-2 bg-Primary text-BgSoftWhite rounded-lg">
            Back to Agents
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div>
    <p className="text-[30px] font-black ">Agents</p>
    <div className="w-[100%] flex justify-between gap-[20px]">
      <div className="w-[70%]">
        <OverviewAgent item={agent} />
        <PhotoAttachmentViewUser initialImages={agent.profile} defaultProfile={Default_Profile.src}  />
      </div>
      <div className="w-[30%]">
        <StatusAgent item={agent} />
      </div>
    </div>
    <div className="flex justify-start w-[100%] mt-[20px] items-center gap-[4px]">
      <Link href={"/dashboard/agents"}>
      <button className="px-[30px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg">
        Back
      </button>
      </Link>
     
    </div>
  </div>
  )
}

export default page;