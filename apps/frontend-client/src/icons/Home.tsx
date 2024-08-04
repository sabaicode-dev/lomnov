import React from "react";
import { BiHomeAlt } from "react-icons/bi";
type prop = {
  className?: string;
};
function Home({ className }: prop) {
  return (
    <>
      <BiHomeAlt className={`${className}`} />
    </>
  );
}

export default Home;
