import axios from "axios";
import { cookies } from "next/headers";
import Layout from "../layout";
import UserSettingHeader from "@/components/molecules/user-setting-header/UserSettingHeader";
import GeneralInfoForm from "@/components/organisms/general-info-form/GeneralInfoForm";

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
    const res = await axios.get(`http://localhost:4000/api/v1/users/me`, {
      headers: {
        Cookie: `accessToken=${accessToken}; username=${username}`,
      },
      withCredentials: true, // This is important for cookies to be sent
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

const GeneralPage = async () => {
  const userDetails = await fetchUserDetails();

  console.log(userDetails);
  if (!userDetails) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <div className="">
        <UserSettingHeader user={userDetails} />
        <div className="max-w-[1300px] mx-auto">
          <GeneralInfoForm user={userDetails} />
        </div>
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


export default GeneralPage;
