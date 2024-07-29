import React from "react";

import { FaHeart } from "react-icons/fa";
type prop = {
  props: string;
};
const HeartInline = ({ props }: prop) => {
  return (
    <>
      <FaHeart className={props} />
    </>
  );
};

export default HeartInline;
