import React from "react";
import Layout from "../../layout"; // Import the layout
import VisitProfileHeader from "@/components/molecules/visit-profile-header/VisitProfileHeader";
import Email from "@/icons/Email";
import Phone from "@/icons/Phone";
import Location from "@/icons/Location";
import Address from "@/icons/Home";

async function fetchUserDetails(username: string) {
  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/users?username=${username}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  const user = await res.json();
  return user[0]; // Adjust this based on your API response
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
      <div className="max-w-[1300px] mx-auto">
        <div
          className="bg-white w-[688px] h-[257px] mt-[5px] p-5 shadow-md rounded-lg"
          style={{ marginTop: "8px" }} 
        >
          <h3 className="font-bold text-lg mb-5">Contact info</h3>
          <div className="grid grid-cols-[auto_auto_1fr] gap-x-[10px] gap-y-5">
            <Email props="w-[23px] h-[20px] text-olive-green" />
            <label className="font-bold">Email</label>
            <span>: {user.email}</span>

            <Phone props="w-[23px] h-[20px] text-olive-green" />
            <label className="font-bold">Phone number</label>
            <span>: {user.phonenumber}</span>

            <Location props="w-[23px] h-[20px] text-olive-green" />
            <label className="font-bold">Location</label>
            <span>: {user.location}</span>

            <Address props="w-[23px] h-[20px] text-olive-green" />
            <label className="font-bold">Address</label>
            <span>: {user.address}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavedPropertiesPage;
