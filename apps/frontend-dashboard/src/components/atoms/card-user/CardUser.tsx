import Image, { StaticImageData } from 'next/image'
import ProfileImage from "@/images/default-profile.jpg"
import React from 'react'
type CardUserProps = {
    image: string | StaticImageData | undefined;
    usernname: string;
}
export default function CardUser({ image, usernname }: Readonly<CardUserProps>) {
    const profileImage = ProfileImage;
    return (
        <div className="flex justify-center items-center gap-[20px]">
            <div className="w-[50px] h-[50px] bg-black rounded-lg overflow-hidden ">
                <Image src={image || profileImage} alt={usernname || "img"} width={100} height={100} className='w-full h-full' />
            </div>
            <p>{usernname}</p>
        </div>
    )
}
