import React from "react";
import bathsicon from "@/images/baths-icon.svg";
import Image from "next/image";
interface prop {
  props?: string;
}
function BathRoom({ props }: prop) {
  return (
    <>
      <Image
        src={bathsicon}
        alt="vector bath"
        width={19}
        height={20}
        className={props}
      />
    </>
  );
}

export default BathRoom;
