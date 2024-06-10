import React from "react";
import { FaFacebookSquare } from "react-icons/fa";

type prop = {
  props: string;
};
function Facebook({ props }: prop) {
  return (
    <>
      <FaFacebookSquare className={props} />
    </>
  );
}

export default Facebook;
