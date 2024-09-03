"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProfileNavigation({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState("post");
  return (
    <div className="w-full mt-[70px]  mx-auto ">
      <div className="border-b border-neutral">
        <div className="flex max-w-[1300px] justify-start mx-auto font-helvetica text-helvetica-paragraph font-bold">
          <Link
            href={`/view-profile/${username}`}
            className={`py-[20px] ml-[10px] xl:ml-0  ${
              activeTab === "post"
                ? "text-olive-green border-b-2   border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("post")}
          >
            Post
          </Link>
          <Link
            href={`/view-profile/contact/${username}`}
            className={`mx-[40px] py-[20px] ${
              activeTab === "contact"
                ? "text-olive-green border-b-2  border-olive-green"
                : "text-charcoal border-b-2 "
            }`}
            onClick={() => setActiveTab("contact")}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
