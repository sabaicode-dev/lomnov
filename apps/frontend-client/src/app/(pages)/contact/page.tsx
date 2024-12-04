import React from 'react'
import Image from "next/image";
import banner from "@/images/banner.png";
import Phone from '@/icons/Phone';
import Email from '@/icons/Email';
import {FacebookF} from '@/icons';
import { PiTelegramLogoLight } from "react-icons/pi";
import { TiSocialFacebookCircular } from "react-icons/ti";

const Context = () => {
  return (
    <main className="w-full ">
    {/* Banner */}
    <header className="relative w-full h-[400px]">
      <Image
        src={banner}
        alt="banner"
        layout="fill"
        objectFit="cover"
        className="brightness-75"
      />

      <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>
      <div className="absolute left-[24%] bottom-[150px] font-helvetica text-helvetica-h2 font-bold text-white">
        <h1>We Are Enjoy To Reply You</h1>
      </div>
      <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[550px] h-px bg-white"></div>
     
    </header>
    <div>
        <div>
            <p>Contact With Social</p>
        </div>
        <div>
            <div>
                  <div>
                      <Phone props='text-2xl'/>
                  </div>
                  <div>
                      <p>068 098 3434</p>
                  </div>
                  <div>
                      <Email props='text-2xl'/>
                  </div>
                  <div>
                      <p>068 098 3434</p>
                  </div>
                  <div>
                    <PiTelegramLogoLight className='text-2xl'/>

                  </div>
                  <div>
                      <p>068 098 3434</p>
                  </div>
                  <div>
                       <TiSocialFacebookCircular className='text-2xl text-slate-900' />

                  </div>
                  <div>
                      <p>068 098 3434</p>
                  </div>
            </div>
            <div>
                 
            </div>
        </div>
    </div>


  </main>

  )
}

export default Context;