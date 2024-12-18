import FormCustomerHeader from "@/components/molecules/form-customer-header/FormCustomerHeader";
import customer from "@/libs/const/mock/customer";
import ItemCustomerList from "@/components/molecules/item-customers-list/ItemCustomerList";

const dataFromCustomer = {
  data_list: "Customers",
  name_data: "Customer",
  url: "/dashboard/add-new-customer",
  addnew: "+ New Customer",
  namedata: "Customers",
  data1: "Email",
  data2: "Contact",
  data3: "Joined Date",
};

const Page = () => {
  return (
    <div>
      <p className="text-[30px] font-black">Customer</p>
      <FormCustomerHeader item={dataFromCustomer} />
      <ItemCustomerList initialData={customer} />
    </div>
  );
};

export default Page;
