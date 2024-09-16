import React from "react";
import Image from "next/image";
import remove from "@/images/remove-icon.svg"

interface Props {
  props?: string;
}
const Remove: React.FC<Props> = ({ props }) => {
  return (
    <Image
      src={remove}
      alt="remove"
      width={100}
      height={100}
      className={props}
    />
  );
};
export default Remove;