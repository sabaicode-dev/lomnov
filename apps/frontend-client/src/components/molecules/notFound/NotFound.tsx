import React from "react";

import banner from "@/images/banner.png";
import Image from "next/image";


const  NotFound = ()=> {


  return (
    <main className="">
      {/* Banner */}
      <header className="relative w-full h-[100px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75 left-0"
        />

      </header>
      <img src="https://th.bing.com/th/id/R.3aac8b9e32201e276bc125396615fb6e?rik=s6m1BLQC7RKu3A&pid=ImgRaw&r=0" alt=""  className="w-[1000px] m-auto"/>

     
    </main>
  );
}

export default NotFound;
