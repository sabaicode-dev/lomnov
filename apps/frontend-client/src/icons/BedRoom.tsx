import React from "react";
import { IoBedOutline } from "react-icons/io5";
interface prop {
  props?: string;
}
function BedRoom({ props }: prop) {
  return (
    <>
     <IoBedOutline className={props} />
    </>
  );
}

export default BedRoom;
