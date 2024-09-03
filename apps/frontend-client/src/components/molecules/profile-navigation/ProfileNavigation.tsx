"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProfileNavigation({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState("saved-property");
  return (
    <div className="w-full mt-[70px]  mx-auto ">
      <div className="border-b border-neutral">
        <div className="flex max-w-[1300px] justify-start mx-auto font-helvetica text-helvetica-paragraph font-bold">
          <Link
            href={`/view-profile/${username}`}
            className={`py-[20px] ml-[10px] xl:ml-0  ${
              activeTab === "saved-property"
                ? "text-olive-green border-b-2   border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("saved-property")}
          >
            Post
          </Link>
          <Link
            href={`/view-profile/contact/${username}`}
            className={`mx-[40px] py-[20px] ${
              activeTab === "listed-property"
                ? "text-olive-green border-b-2  border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("listed-property")}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
