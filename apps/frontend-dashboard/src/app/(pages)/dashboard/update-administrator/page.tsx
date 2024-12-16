"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UploadProfile from "@/components/molecules/upload-profile/UploadProfile";
import RoleAssignment from "@/components/molecules/role-assignment/RoleAssignment";
import StatusEdit from "@/components/molecules/status-edit/StatusEdit";
import OverviewAdmin from "@/components/molecules/overview-administrator/OverviewAdmin";
import adminData from "@/libs/const/mock/administator";

//==================================
type AdminData = {
  id: number;
  name: string;
  role: string;
  create_at: string;
};

const UpdateAdministrator = () => {
  const [administrator, setAdministrator] = useState<AdminData | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch the admin ID from URL query
  const adminId = Number(searchParams.get("id"));

  // Fetch admin details based on ID
  useEffect(() => {
    const selectedAdmin = adminData.find((item) => item.id === adminId);
    if (selectedAdmin) {
      setAdministrator(selectedAdmin);
    }
  }, [adminId]);

  // Delete handler
  const handleDeleteClick = () => {
    setIsPopupVisible(true);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleConfirmDelete = () => {
    if (administrator) {
      // Remove the admin from the mock data (simulate delete)
      const updatedAdmins = adminData.filter((item) => item.id !== administrator.id);
      console.log("Updated administrators list:", updatedAdmins);

      // Navigate back to the administrators list page
      router.push("/dashboard/administrators");
    }
  };

  if (!administrator) {
    return <div className="text-center mt-10">Administrator not found</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-[30px] font-black">Update Admin</p>
        <button
          className="px-4 text-[14px] py-2 bg-Negative text-BgSoftWhite rounded-lg cursor-pointer"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>

      {/* Delete Confirmation Popup */}
      {isPopupVisible && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h3 className="text-lg font-bold mb-4">Delete {administrator.name}?</h3>
            <p className="mb-4">Are you sure you want to delete this administrator?</p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Administrator Details */}
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <OverviewAdmin />
          <RoleAssignment />
          <UploadProfile />
        </div>
        <div className="w-[30%]">
          <StatusEdit
            item={{
              create_at: administrator.create_at,
              latest_updated: "2024-12-13",
            }}
          />
        </div>
      </div>

      <div className="flex justify-start w-[100%] mt-[20px] items-center gap-4">
        <button className="px-[12px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg">
          Update
        </button>
        <button
          className="px-[12px] text-[14px] py-[8px] bg-BgSoftWhite text-black rounded-lg"
          onClick={() => router.push("/dashboard/administrators")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateAdministrator;