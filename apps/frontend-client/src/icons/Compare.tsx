import React from "react";
import compareicon from "@/images/iconamoon_compare.svg"
import Image from "next/image";
interface prop {
  className?: string;  // Change props to classNameng;
}
function Compare({ className }: prop) {
  return (
    <>
      <Image
        src={compareicon}
        alt="vector bath"
        width={18}
        height={23}
        className={className}
      />
    </>
  );
}

export default Compare;
