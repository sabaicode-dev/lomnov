import React from "react";
import Layout from "../../layout"; // Import the layout
import VisitProfileHeader from "@/components/molecules/visit-profile-header/VisitProfileHeader";
import Email from "@/icons/Email";
import Phone from "@/icons/Phone";
import Location from "@/icons/Location";
import Address from "@/icons/Home";

async function fetchUserDetails(userName: string) {
  // console.log(process.env.NEXT_PUBLIC_BASE_URL_GETWAY);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_GETWAY}/users?userName=${userName}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  const user = await res.json();
  // console.log(user.users[0]);
  return user.users[0]; // Adjust this based on your API response
}

const SavedPropertiesPage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const user = await fetchUserDetails(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Layout>
      <VisitProfileHeader user={user} />
      <div className="max-w-[1300px] mx-auto p-4">
        <div className="bg-white w-full sm:w-[688px] h-auto sm:h-[257px] mt-5 p-5  rounded-lg">
          <h3 className="font-bold text-lg mb-5">Contact info</h3>
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center space-x-3">
              <Email props="w-[23px] h-[20px] text-olive-green" />
              <label className="font-bold text-base">Email</label>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {user.email}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3">
              <Phone props="w-[23px] h-[20px] text-olive-green" />
              <label className="font-bold text-base">Phone number</label>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {user.phonenumber}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3">
              <Location props="w-[23px] h-[20px] text-olive-green" />
              <label className="font-bold text-base">Location</label>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {user.location}
              </span>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-3">
              <Address props="w-[23px] h-[20px] text-olive-green" />
              <label className="font-bold text-base">Address</label>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {user.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavedPropertiesPage;
