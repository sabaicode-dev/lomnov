"use client";

import React, { useState } from "react";
import FormCustomerHeader from "@/components/molecules/form-customer-header/FormCustomerHeader";
import customer from "@/libs/const/mock/customer";
import Pagenation from '@/components/molecules/pagenation/Pagenation'
import ItemCustomer from "@/components/molecules/item-customers/ItemCustomer";

const dataFromCustomer = {
  data_list : "Customers",
  name_data : "Customer",
  url : "/dashboard/add-new-customer",
  addnew : "+ New Customer",
  namedata : "Customers",
  data1 : "Email",
  data2 : "Contact",
  data3 : "Joined Date"
}

const page = () => {
  const [data, setData] = useState(customer);

  // Handle delete item
  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData); // Update the state with filtered data
  };

  return (
    <div>
      <p className="text-[30px] font-black ">Customer</p>
      
      <div>
        <FormCustomerHeader item={dataFromCustomer} />
        {data.length > 0 ? (
          <div className="">
            {data.map((items) => {
              return <ItemCustomer item={items} key={items.id} onDelete={handleDelete} />;
            })}
          </div>
        ) : (
          <p>No Data</p>
        )}
        <Pagenation />
      </div>
    </div>
  );
};

export default page;
