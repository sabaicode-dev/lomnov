// profile/saved-properties/[username]/page.tsx

import React from "react";
import Layout from "../../layout"; // Import the layout
import UserProfileHeader from "@/components/molecules/user-profile-header/UserProfileHeader"; // Adjust this to your file path
import SavedProperties from "@/components/organisms/saved-properties/SavedProperties";

async function fetchUserDetails(username: string) {
  const res = await fetch(`https://lomnov.onrender.com/api/v1/users?username=${username}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  const user = await res.json();
  return user[0]; // Adjust this based on your API response
}

const SavedPropertiesPage = async ({ params }: { params: { username: string } }) => {
  const user = await fetchUserDetails(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <UserProfileHeader user={user} /> {/* Reusing the ProfileHeader */}
      <div className="max-w-[1300px] mx-auto">Saved Properties</div>
    </Layout>
  );
};

// This function gets called at build time
export async function generateStaticParams() {
  // Here you should provide the list of usernames you want to pre-render
  const usernames = ['user1', 'user2', 'user3']; // Example usernames
  return usernames.map((username) => ({
    username,
  }));
}

export default SavedPropertiesPage;
