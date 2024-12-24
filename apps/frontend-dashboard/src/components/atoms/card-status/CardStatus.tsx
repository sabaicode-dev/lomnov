import React from 'react'
type CardStatusProps = {
    status: string | boolean
}
export default function CardStatus({status} : CardStatusProps) {
    return (
        <div className='w-[200px] flex justify-start'>{status === true ? (<p className=' bg-Positive/20   text-Positive px-[4px]  rounded-[6px] border-2 border-Positive/20'>Active</p>):(<p className=' bg-Negative/20   text-Negative px-[4px]  rounded-[6px] border-2 border-Negative/20'>Inactive</p>)}</div>
    )
}
