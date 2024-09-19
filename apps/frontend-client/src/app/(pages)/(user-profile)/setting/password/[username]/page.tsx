import axios from "axios";
import { cookies } from "next/headers";
import UserSettingHeader from "@/components/molecules/user-setting-header/UserSettingHeader";
import Layout from "../../layout";
import PasswordForm from "@/components/organisms/password-form/PasswordForm";

async function fetchUserDetails() {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const username = cookies().get("username")?.value;

    if (!accessToken || !username) {
      throw new Error("Access token not found");
    }

    // Fetch user details using the access token
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

const PasswordPage = async () => {
  const userDetails = await fetchUserDetails();

  if (!userDetails) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <UserSettingHeader user={userDetails} />
      <div className="max-w-[1300px] mx-auto">
        <PasswordForm />
      </div>
    </Layout>
  );
};

export default PasswordPage;
