import React from "react";
import { FaBath } from "react-icons/fa";
interface prop {
  props?: string;
}
function BathRoom({ props }: prop) {
  return (
    <>
      <FaBath className={props} />
    </>
  );
}

export default BathRoom;
