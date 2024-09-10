import React from "react";
import { LuDollarSign } from "react-icons/lu";
interface prop {
  props?: string;
}

function Dollar({ props }: prop) {
  return (
    <>
      <LuDollarSign className={props} />
    </>
  );
}

export default Dollar;
