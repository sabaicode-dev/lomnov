"use client";

import React, { useState } from "react";
import { TbPhoto } from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";
import { FaLink, FaStrikethrough } from "react-icons/fa6";
import { FiItalic, FiBold,FiUnderline  } from "react-icons/fi";

//=============================================
const RoleAssignment = () => {

  const [selectedRole, setSelectedRole] = useState("");

  return (
    <div>
      {/*Role Assignment*/}
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[100%]">
          <div className="w-[100%] mt-[40px] p-[24px] bg-[#F3F4F6] rounded-xls">
            <p className="text-[20px] font-[600]">Role Assignment</p>
            <form className="w-[100%] text-Black">
                <div className="w-[100%] mt-[20px]">
                  <label>Select Role*</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-Black w-[100%] h-[40px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px] rounded-xls p-[10px] focus:outline-none focus:border-Primary/20"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleAssignment;
