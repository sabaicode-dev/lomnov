import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function PropertyOwner({cognitosub}:{cognitosub:string}) {
    return (
        <section className='rounded-lg h-auto'>
            <div className='flex items-center space-x-4'>
                {/* Profile Image */}
                <div className='w-[70px] h-[65px] rounded-full bg-gray-300 overflow-hidden'>
                    <Link href={`/view-profile/${cognitosub}`}>
                        <Image src="/default-profile.jpeg" alt="Profile Image" width={70} height={70} className="object-cover cursor-pointer " />
                    </Link>
                </div>

                {/* User Info */}
                <div className='w-[60%]'>
                    <p className='text-[16px] font-[400] leading-[24px] text-[#000000]'>Listed by</p>
                    <h2 className='text-[16px] leading-[24px] text-[#252728] font-[700] '>User Name</h2>
                </div>
            </div>

            {/* Contact Button Section */}
            <div className='mt-4 border px-[25px] py-[5px] border-[#7D7757] z-10 rounded-[5px]'>
                <button className='w-full leading-[24px] text-[#252728] font-[700] rounded-lg focus:outline-none'>
                    Contact
                </button>
            </div>
        </section>
    )
}

export default PropertyOwner
