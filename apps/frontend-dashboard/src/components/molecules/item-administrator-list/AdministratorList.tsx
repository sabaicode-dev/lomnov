"use client";

import React, { useEffect, useState } from "react";
import { useCustomers } from "@/context/customer";
import Pagenation from "@/components/molecules/pagenation/Pagenation";
import Loading from "@/components/atoms/loading/Loading";
import ItemAdminstrator from "../item-administator/ItemAdminstrator";
import FormAdminHeader from "@/components/molecules/form-admin-header/FormAdminHeader";

const AdministratorList = () => {
  const [liveSearch, setLiveSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const dataFromAgents = {
    data_list: "Administator",
    name_data: "Administrator",
    url: "/dashboard/add-new-administrator",
    addnew: "+ New Administrator",
    namedata: "Administrator",
    data1: "Email",
    data2: "Status",
    data3: "Role",
    data4: "Create At",
  };

  const {
    customers, // Fetch customers from context
    loading,
    error,
    pagination,
    fetchCustomers,
  } = useCustomers();

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  useEffect(() => {
    fetchCustomers({ page: currentPage, limit: resultsPerPage });
  }, [currentPage, resultsPerPage, fetchCustomers]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleResultsPerPageChange = (newLimit: number) => {
    setResultsPerPage(newLimit);
    setCurrentPage(1);
  };

  const filteradmin = customers.filter((data) => 
    data.role === "admin" ||  data.role === "Admin"
  );

  // Combine filtering logic
  const filtercustomer = filteradmin.filter((customer) => {
    const matchesRole = selectedRole
      ? customer.role?.toLowerCase() === selectedRole.toLowerCase()
      : true;

    // Convert status to a string for comparison
    const customerStatus = typeof customer.status === "boolean" 
      ? customer.status.toString()
      : customer.status;

    const matchesStatus = selectedStatus
      ? customerStatus === selectedStatus.toLowerCase()
      : true;

    const matchesSearch =
      liveSearch === "" ||
      customer.userName?.toLowerCase().includes(liveSearch.toLowerCase()) ||
      customer.email?.toLowerCase().includes(liveSearch.toLowerCase());

    return matchesRole && matchesStatus && matchesSearch;
  });

  return (
    <div>
      <FormAdminHeader
        liveSearch={liveSearch}
        onChange={(e) => setLiveSearch(e.target.value)}
        item={dataFromAgents}
        onRoleChange={setSelectedRole}
        onStatusChange={setSelectedStatus}
      />
      {/* Display error if exists */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Loading Spinner */}
      {loading ? (
        <div className="w-full flex items-center justify-center mt-10">
          <Loading />
        </div>
      ) : (
        <div>
          {/* Customers List */}
          {filtercustomer.length > 0 ? (
            <div>
              {filtercustomer.map((item) => (
                <ItemAdminstrator
                  key={item._id} // Correct usage of _id
                  item={item}
                />
              ))}

              {/* Pagination Component */}
              {pagination && pagination.currentPage > 0 && (
                <Pagenation
                  currentPage={currentPage}
                  totalResults={pagination.totalCustomers}
                  resultsPerPage={resultsPerPage}
                  onPageChange={handlePageChange}
                  onResultsPerPageChange={handleResultsPerPageChange}
                />
              )}
            </div>
          ) : (
            <p className="text-center text-Negative text-[22px] mt-[10px]">No Found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdministratorList;
