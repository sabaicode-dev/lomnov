import ItemCustomerList from "@/components/molecules/item-customer-list/ItemCustomerList";
import { CustomerProvider } from "@/context/customer";

const page = () => {
  return (
    <div>
      <p className="text-[30px] font-black">Customers</p>
      <CustomerProvider>
        <ItemCustomerList />
      </CustomerProvider>
    </div>
  );
};

export default page;
