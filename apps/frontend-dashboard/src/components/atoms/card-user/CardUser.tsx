import Image, { StaticImageData } from 'next/image'
import React from 'react'
type CardUserProps = {
    image: string | StaticImageData;
    usernname: string;
}
export default function CardUser({ image, usernname }: CardUserProps) {
    return (
        <div className="flex justify-center items-center gap-[20px]">
            <div className="w-[50px] h-[50px] bg-black rounded-lg overflow-hidden ">
                <Image src={image} alt="img" width={100} height={100} />
            </div>
            <p>{usernname}</p>
        </div>
    )
}
