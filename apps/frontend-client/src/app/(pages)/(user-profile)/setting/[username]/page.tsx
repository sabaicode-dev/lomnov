import React from "react";
import Layout from "../layout"; // Import the layout

import UserSettingHeader from "@/components/molecules/user-setting-header/UserSettingHeader";

async function fetchUserDetails(username: string) {
  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/users?username=${username}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  const user = await res.json();
  return user[0]; // Adjust this based on your API response
}

const GeneralPage = async ({ params }: { params: { username: string } }) => {
  const user = await fetchUserDetails(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <div className="">
        <UserSettingHeader user={user} />
        <div className="max-w-[1300px] mx-auto">General Info</div>
      </div>
    </Layout>
  );
};

export default GeneralPage;
