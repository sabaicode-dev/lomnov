"use client";

import React, { useEffect, useState } from "react";
import { useCustomers } from "@/context/customer";
import Pagenation from "@/components/molecules/pagenation/Pagenation";
import Loading from "@/components/atoms/loading/Loading";
import ItemAdminstrator from "../item-administator/ItemAdminstrator";
import { CustomerResponseType } from "@/libs/types/api-customers/customer-response";
import FormAdminHeader from "@/components/molecules/form-admin-header/FormAdminHeader";
const AdministratorList = () => {
  const [liveSearch, setLiveSearch] = useState("");
  const [searchState, setSearchState] = useState<CustomerResponseType[]>([]);

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

  useEffect(() => {
    if (liveSearch.trim() === "") {
      setSearchState(
        customers // Fetch customers from context
      ); // Show all properties when search is cleared
    } else {
      setSearchState(() => {
        return customers.filter((item) => {
          const username = item.userName.toLocaleLowerCase();
          const email = item.email.toLocaleLowerCase();

          // Check if either title or category matches the liveSearch query
          return (
            (username && username.includes(liveSearch.toLowerCase())) ||
            (email && email.includes(liveSearch.toLowerCase()))
          );
        });
      });
    }
  }, [liveSearch, customers]); // Re-run the effect when liveSearch or properties change

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiveSearch(e.target.value); // Update the liveSearch state
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  // Fetch customers on page load or when pagination changes
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

  const filtercustomer = searchState.filter(
    (data) => data.role === "admin" || data.role === "Admin"
  );

  return (
    <div>
      <FormAdminHeader
        item={dataFromAgents}
        onChange={handleChange}
        liveSearch={liveSearch}
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
              {customers.map((item) => (
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
            <p>No customers found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdministratorList;
