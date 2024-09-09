"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function UserProfileNavigation({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState("listed-properties");
  return (
    <div className="w-full mt-[70px]  mx-auto ">
      <div className="border-b border-neutral">
        <div className="flex max-w-[1300px] justify-start mx-auto font-helvetica text-helvetica-paragraph font-bold">
          <Link
            href={`/view-profile/${username}`}
            className={`py-[20px] ml-[10px] xl:ml-0  ${
              activeTab === "listed-properties"
                ? "text-olive-green border-b-2   border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("listed-properties")}
          >
            Listed Properties
          </Link>
          <Link
            href={`/view-profile/saved-properties/${username}`}
            className={`mx-[40px] py-[20px] ${
              activeTab === "saved-properties"
                ? "text-olive-green border-b-2  border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("saved-properties")}
          >
            Saved Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
