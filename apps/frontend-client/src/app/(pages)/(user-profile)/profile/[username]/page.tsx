// app/profile/[username]/page.tsx

import React from "react";
import Layout from "../layout";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import ProfilePageClient from "@/components/molecules/profile-page-client/ProfilePageClient"; // Import client component
import { User } from "@/context/user";

async function fetchUserDetails(username: string): Promise<User | null> {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINTS.USER}?username=${encodeURIComponent(username)}`);
    return res.data.users[0] || null;
  } catch {
    return null;
  }
}

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  console.log(username);
  
  const user = await fetchUserDetails(username);
  console.log("User Profiles:::: ,",user);
  
  if (!user) {
    return <div>User not found</div>; // Render a message if user data is not found
  }

  return (
    <Layout>
      <ProfilePageClient user={user} usernameParam={username} /> {/* Pass data to client component */}
    </Layout>
  );
};

export default ProfilePage;
