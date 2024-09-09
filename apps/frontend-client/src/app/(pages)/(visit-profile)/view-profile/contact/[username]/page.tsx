import React from "react";

function Page({ params }: { params: { username: string } }) {
  return (
    <div className="max-w-[1300px] mx-auto p-[10px] xl:p-0">page contact{params.username}</div>
  );
}

export default Page;
