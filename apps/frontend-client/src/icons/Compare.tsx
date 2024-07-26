import React from "react";
import compareicon from "@/images/iconamoon_compare.svg"
import Image from "next/image";
interface prop {
  props?: string;
}
function Compare({ props }: prop) {
  return (
    <>
      <Image
        src={compareicon}
        alt="vector bath"
        width={18}
        height={23}
        className={props}
      />
    </>
  );
}

export default Compare;
