// profile/[username]/page.tsx

import React from "react";
import Layout from "../layout"; // Import the layout
import ListedProperties from "@/components/organisms/listed-properties/ListedProperties";
import UserProfileHeader from "@/components/molecules/user-profile-header/UserProfileHeader";

async function fetchUserDetails(username: string) {
  try {
    const res = await fetch(
      `https://lomnov.onrender.com/api/v1/users?username=${username}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch user details");
    }
    const user = await res.json();
    return user[0]; // Adjust this based on your API response
  } catch (error) {
    console.error(error);
    return null; // Return null or a default user object
  }
}


export async function generateStaticParams() {
  // You should return a list of usernames or whatever parameters you need
  const res = await fetch(`https://lomnov.onrender.com/api/v1/users`); // Adjust endpoint as needed
  const users = await res.json();

  return users.map((user: { username: string }) => ({
    username: user.username,
  }));
}

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const user = await fetchUserDetails(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <div className="">
        <UserProfileHeader user={user} />
        <ListedProperties user={params.username} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
