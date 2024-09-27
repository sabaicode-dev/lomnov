import axios from "axios";
import { cookies } from "next/headers";
import Layout from "../layout";
import UserSettingHeader from "@/components/molecules/user-setting-header/UserSettingHeader";
import GeneralInfoForm from "@/components/organisms/general-info-form/GeneralInfoForm";

async function fetchUserDetails() {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const username = cookies().get("username")?.value;

    if (!accessToken || !username) {
      throw new Error("Required cookies not found");
    }

    const res = await axios.get(`http://localhost:4000/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Add the authorization header
      },
      withCredentials: true, // Cookies will be sent automatically
    });

    return res.data;
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    // Return an error message or code if needed
    return { error: error.message || "An unknown error occurred" };
  }
}

const GeneralPage = async () => {
  const userDetails = await fetchUserDetails();

  console.log(userDetails);
  if (!userDetails || userDetails.error) {
    return <div>User not found or error fetching details</div>;
  }

  return (
    <Layout>
      <div>
        <UserSettingHeader user={userDetails} />
        <div className="max-w-[1300px] mx-auto">
          <GeneralInfoForm user={userDetails} />
        </div>
      </div>
    </Layout>
  );
};



export default GeneralPage;
