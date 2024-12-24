import React from "react";
import AccountSetting from "@/components/organisms/account-setting/AccountSetting";
const page = () => {
  return (
    <div>
      <p className="text-[30px] font-black ">Account Setting</p>
      <div className="w-[100%] flex justify-between  mt-[50px]">
        <AccountSetting />
      </div>
    </div>
  );
};

export default page;
