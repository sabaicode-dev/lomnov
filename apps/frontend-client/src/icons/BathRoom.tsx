import React from "react";
import { LuBath } from "react-icons/lu";
interface prop {
  props?: string;
}
function BathRoom({ props }: prop) {
  return (
    <>
      <LuBath className={props} />
    </>
  );
}

export default BathRoom;
