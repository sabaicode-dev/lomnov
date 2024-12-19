import AddAdmin from "@/components/molecules/add-new-admin/AddAdmin";
import React from "react";


const page = () => {
  return (
    <div className="w-[50%]">
      <p className="text-[30px] font-black ">Add new admin</p>
      <AddAdmin/>
      
    </div>
  );
};

export default page;