import React from 'react'
type CardDateProps = {
    datetime: string;
}
export default function CardDate({datetime}: CardDateProps) {
    return (
        <div className='w-[200px] flex justify-start'><p>{datetime}</p></div>
    )
}
