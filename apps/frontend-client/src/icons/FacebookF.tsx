import React from "react";
import { FaFacebookF } from "react-icons/fa";

type prop = {
  props: string;
};

function FacebookF({ props }: prop) {
  return (
    <>
      <FaFacebookF className={props} />
    </>
  );
}

export default FacebookF;
