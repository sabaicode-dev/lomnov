import React from 'react'
import { SlLocationPin } from "react-icons/sl";

interface prop {
  props? : string
}
function Location({props}: prop) {
  return (
    <>  <SlLocationPin className={props}/></>
  )
}

export default Location
