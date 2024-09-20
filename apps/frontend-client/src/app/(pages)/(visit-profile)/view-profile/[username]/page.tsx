import React from "react";
import Layout from "../layout"; // Import the layout
import VisitProfileHeader from "@/components/molecules/visit-profile-header/VisitProfileHeader";
import UserPostedProperties from "@/components/organisms/user-posted-properties/UserPostedProperties";
import axios from "axios";

// Accept the username as an argument rather than fetching from cookies
async function fetchUserDetails(username: string) {
  try {
    // Make sure the username is available
    if (!username) {
      throw new Error("Username is required");
    }

    // Make the API call to get the user details based on the username
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_GETWAY}/users/username/${username}`,
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  // Extract the username from route params (or props, depending on your setup)
  const username = params.username;
  console.log("username",username);
  

  // Fetch user details
  const user = await fetchUserDetails(username);

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
