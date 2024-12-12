import React from "react";
import FormCustomerCrud from "@/components/molecules/form-customer-crud/FormCustomerCrud";
import customer from "@/libs/const/customer";
import Pagenation from '@/components/molecules/pagenation/Pagenation'
import ItemCustomer from "@/components/molecules/item-customers/ItemCustomer";

const dataFromAgents = {
  data_list : "data",
  name_data : "Customer",
  url : "/add-new-customer",
  addnew : "+ New Customer",
  namedata : "Customers",
  data1 : "Email",
  data2 : "Contact",
  data3 : "Joined Date"
}

const page = () => {
  return (
    <div>
      <p className="text-[30px] font-black ">Customer</p>
      
      <div>
        <FormCustomerCrud item={dataFromAgents} />
        {customer.length > 0 ? (
          <div className="">
            {customer.map((items) => {
              return <ItemCustomer item={items} key={items.id} />;
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
