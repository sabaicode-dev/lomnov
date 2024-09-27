// profile/saved-properties/[username]/page.tsx

import React from "react";
import Layout from "../../layout"; // Import the layout
import UserSettingHeader from "@/components/molecules/user-setting-header/UserSettingHeader";
import PasswordForm from "@/components/organisms/password-form/PasswordForm";

async function fetchUserDetails(username: string) {
  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/users?username=${username}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  const user = await res.json();
  return user[0]; // Adjust this based on your API response
}

const PasswordPage = async ({ params }: { params: { username: string } }) => {
  const user = await fetchUserDetails(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <UserSettingHeader user={user} /> {/* Reusing the ProfileHeader */}
      <div className="max-w-[1300px] mx-auto">
        <PasswordForm />
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

export default PasswordPage;
