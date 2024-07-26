import React from "react";
import bedicon from "@/images/bed-icon 1.svg";
import Image from "next/image";
interface prop {
  props?: string;
}
function BedRoom({ props }: prop) {
  return (
    <>
      <Image
        src={bedicon}
        alt="bed icon"
        width={20}
        height={20}
        className={props}
      />
    </>
  );
}

export default BedRoom;
