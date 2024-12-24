"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PhotoAttachment from "@/components/molecules/photo-attachment/PhotoAttachment";
import { StaticImageData } from "next/image";
import StatusEdit from "@/components/molecules/status-edit/StatusEdit";
import customerData from "@/libs/const/mock/customer";
import OverviewCustomer from "@/components/molecules/overview-customer/OverviewCustomer";

//==================================
type ItemData = {
  id: number;
  img: string | StaticImageData;
  name: string;
  Email: string;
  Contact: string;
  date: string;
};

const UpdateCustomer = () => {
  const [customer, setCustomer] = useState<ItemData | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch the customer ID from URL query
  const customerId = Number(searchParams.get("id"));

  // Fetch customer details based on ID
  useEffect(() => {
    const selectedCustomer = customerData.find((item) => item.id === customerId);
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
  }, [customerId]);

  // Delete handler
  const handleDeleteClick = () => {
    setIsPopupVisible(true);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleConfirmDelete = () => {
    if (customer) {
      // Remove the customer from the mock data (simulate delete)
      const updatedCustomers = customerData.filter((item) => item.id !== customer.id);
      console.log("Updated customers list:", updatedCustomers);

      // Navigate back to the customers list page
      router.push("/dashboard/customers");
    }
  };

  if (!customer) {
    return <div className="text-center mt-10">Customer not found</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-[30px] font-black">Update Customer</p>
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
            <h3 className="text-lg font-bold mb-4">Delete {customer.name}?</h3>
            <p className="mb-4">Are you sure you want to delete this customer?</p>
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

      {/* Customer Details */}
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <OverviewCustomer />
          <PhotoAttachment />
        </div>
        <div className="w-[30%]">
          <StatusEdit
            item={{
              create_at: customer.date,
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
          onClick={() => router.push("/dashboard/customers")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateCustomer;