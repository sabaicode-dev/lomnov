import React from "react";
import compareicon from "@/images/iconamoon_compare.svg";
import Image from "next/image";
interface prop {
  props?: string;
  onClick: () => void;
}
function Compare({ props, onClick }: prop) {
  return (
    <>
      <Image
        src={compareicon}
        alt="vector bath"
        width={18}
        height={23}
        className={props}
        onClick={onClick}
      />
    </>
  );
}

export default Compare;
