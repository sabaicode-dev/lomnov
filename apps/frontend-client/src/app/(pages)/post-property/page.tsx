import Image from 'next/image'
import React from 'react'
import banner from "@/images/banner.png";

export default function page() {
    return (
        <main className='w-full'>
            <header className="relative w-full h-[300px]">
                <Image
                    src={banner}
                    alt="banner"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-75"
                />
                <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>
            </header>
            <div className='w-full h-full'>
                <div className='max-w-full w-[1400px] m-auto mt-16 h-full'>
                    <h1 className='font-[600] leading-[5px] text-[20px] font-helvetica text-helvetica-h4'>Create properties</h1>
                    <form className='w-full h-full' action="">
                        <div className='w-full block justify-between flex-row mt-2 gap-1 h-[230px]'>
                            <div className='w-full h-[80%] flex flex-1 gap-9 justify-between items-center '>
                                <div className='w-1/2'>
                                    <p className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph font-[600]'>Title*</p>
                                    <input className='w-full rounded-lg border-none text-[#A1A1AA] bg-white shadow-md py-[13px] px-[12px]' placeholder='Properties title' type="text" />
                                </div>
                                <div className='w-1/2'>
                                    <p className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph font-[600]'>Slug*</p>
                                    <input className='w-full rounded-lg border-none text-[#A1A1AA] bg-white shadow-md py-[13px] px-[12px]' placeholder='Properties slug' type="text" />
                                </div>
                            </div>
                            <div className='w-full h-[20%] '></div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
