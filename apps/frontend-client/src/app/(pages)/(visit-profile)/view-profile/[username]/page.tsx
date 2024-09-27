// profile/[username]/page.tsx

import React from "react";
import Layout from "../layout"; // Import the layout
import VisitProfileHeader from "@/components/molecules/visit-profile-header/VisitProfileHeader";

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
      </div>
    </Layout>
  );
};

// This function gets called at build time
export async function generateStaticParams() {
  // Replace this with the actual logic to get the list of usernames
  const usernames = ['user1', 'user2', 'user3']; // Example usernames
  return usernames.map((username) => ({
    username,
  }));
}

export default ProfilePage;
