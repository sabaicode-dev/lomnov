import React from "react";
import { FaBed } from "react-icons/fa";
interface prop {
  props?: string;
}
function BedRoom({ props }: prop) {
  return (
    <>
      <FaBed className={props} />
    </>
  );
}

export default BedRoom;
