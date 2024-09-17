import React from "react";
import Layout from "../layout"; // Import the layout
import VisitProfileHeader from "@/components/molecules/visit-profile-header/VisitProfileHeader";
import UserPostedProperties from "@/components/organisms/user-posted-properties/UserPostedProperties";

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

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const user = await fetchUserDetails(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <div className="">
        <VisitProfileHeader user={user} />
        <div className="max-w-[1300px] mx-auto mt-[20px] p-[10px] lg:p-0">
        <UserPostedProperties user={user.username} />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
