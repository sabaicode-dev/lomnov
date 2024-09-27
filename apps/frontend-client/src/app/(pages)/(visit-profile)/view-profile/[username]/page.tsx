import React from "react";
import Layout from "../layout"; // Import the layout
import VisitProfileHeader from "@/components/molecules/visit-profile-header/VisitProfileHeader";
import UserPostedProperties from "@/components/organisms/user-posted-properties/UserPostedProperties";
import axios from "axios";

async function fetchUserDetails(userName: string) {
  // console.log(process.env.NEXT_PUBLIC_BASE_URL_GETWAY);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_GETWAY}/users?userName=${userName}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  const user = await res.json();
  // console.log(user.users[0]);
  return user.users[0]; // Adjust this based on your API response
}

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const user = await fetchUserDetails(params.username);
  // console.log("hello" + user);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <div >
        <VisitProfileHeader user={user} />
        <div className="max-w-[1300px] mx-auto mt-[20px] p-[10px] lg:p-0">
          listed properties
          {/* <UserPostedProperties user={user.username} /> */}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
