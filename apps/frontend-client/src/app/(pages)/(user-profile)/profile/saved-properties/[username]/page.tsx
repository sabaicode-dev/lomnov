import React from "react";
import Layout from "../../layout"; // Import the layout
import { cookies } from "next/headers";
import FavoriteProperties from "@/components/organisms/saved-properties/SavedProperties";
import UserProfileHeader from "@/components/molecules/user-profile-header/UserProfileHeader";

import axios from "axios";
import SavedProperties from "@/components/organisms/saved-properties/SavedProperties";

async function fetchUserDetails() {
  try {
    // Get the cookies
    const accessToken = cookies().get("accessToken")?.value;
    const username = cookies().get("username")?.value;

    // Make sure the cookies are available before making the request
    if (!accessToken || !username) {
      throw new Error("Required cookies not found");
    }

    // Make the API call, passing cookies in the 'Cookie' header
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_GETWAY}/users/me`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}; username=${username}`,
        },
        withCredentials: true, // This is important for cookies to be sent
      },
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

const page = async () => {
  const user = await fetchUserDetails();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <div className="">
        <UserProfileHeader user={user} />
        <SavedProperties user={user.userName}/>
      </div>
    </Layout>
  );
};

export default page;
