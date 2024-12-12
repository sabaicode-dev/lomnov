import React from 'react'
type CardStatusProps = {
    status: string | boolean
}
export default function CardStatus({status} : CardStatusProps) {
    return (
        <div className='w-[200px] flex justify-start' >{status === "Active" ? (<p className=" bg-Negative/20  text-Negative px-[4px] border-2 border-Negative/20 rounded-[6px]">{status}</p>) : (<p className="bg-Positive/20 text-Positive px-[4px] border-2 border-Positive/20 rounded-[6px]">{status}</p>)}</div>
    )
}
