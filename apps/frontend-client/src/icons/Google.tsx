import React from 'react'
import { FaGoogle } from 'react-icons/fa'
type prop = {
    props: string
}
function Google({props}: prop) {
  return (
    <>
    <FaGoogle className={props}/>
    </>
  )
}

export default Google
