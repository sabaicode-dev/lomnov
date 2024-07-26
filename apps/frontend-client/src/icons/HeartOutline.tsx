import React from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
type prop = {
  props: string;
};
const HeartOutline = ({ props }: prop) => {
  return (
    <>
     <FaRegHeart className={props}/>
    </>
  );
};

export default HeartOutline;
