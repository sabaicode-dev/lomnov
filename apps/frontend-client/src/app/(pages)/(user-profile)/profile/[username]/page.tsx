// profile/[username]/page.tsx

import React from "react";
import Layout from "../layout"; // Import the layout
import ListedProperties from "@/components/organisms/listed-properties/ListedProperties";
import UserProfileHeader from "@/components/molecules/user-profile-header/UserProfileHeader";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

async function fetchUserDetails(username: string) {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.USER}?username=${username}`)
    console.log('fetchUserProfile::: ', fetchUserDetails)
    if (res.status !== 200) {
      throw new Error("Failed to fetch user details");
    }
    ;
    return res.data; // Adjust this based on your API response
  } catch (error) {
    console.error(error);
    return null; // Return null or a default user object
  }
}


export async function generateStaticParams() {
  // You should return a list of usernames or whatever parameters you need
  const res = await axiosInstance.get(`${API_ENDPOINTS.USER}`); // Adjust endpoint as needed

  return res.data.users[0].userName;
}

const ProfilePage = async ({ username }: { username: string }) => {
  const user = await fetchUserDetails(username);


  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <div>
        <UserProfileHeader user={user} />
        <ListedProperties user={username} />
      </div>
    </Layout>
  );
};

export default ProfilePage;
