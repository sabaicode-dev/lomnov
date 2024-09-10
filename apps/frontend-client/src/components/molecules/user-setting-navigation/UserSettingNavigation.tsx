"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function UserSettingNavigation({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState("general-info");
  return (
    <div className="w-full mt-[70px]  mx-auto ">
      <div className="border-b border-neutral">
        <div className="flex max-w-[1300px] justify-start mx-auto font-helvetica text-helvetica-paragraph font-bold">
          <Link
            href={`/view-profile/${username}`}
            className={`py-[20px] ml-[10px] xl:ml-0  ${
              activeTab === "general-info"
                ? "text-olive-green border-b-2   border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("general-info")}
          >
            General Info
          </Link>
          <Link
            href={`/view-profile/setting/${username}`}
            className={`mx-[40px] py-[20px] ${
              activeTab === "setting"
                ? "text-olive-green border-b-2  border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("setting")}
          >
            Password
          </Link>
        </div>
      </div>
    </div>
  );
}
