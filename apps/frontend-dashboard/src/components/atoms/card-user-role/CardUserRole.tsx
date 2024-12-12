import React from 'react'
type CardUserRoleProps = {
    role: string;
}
export default function CardUserRole({role}: CardUserRoleProps) {
    return (
        <div className='w-[200px] flex justify-start'> <p className=' bg-Positive/20   text-Positive px-[4px]  rounded-[6px] border-2 border-Positive/20'>{role}</p></div>
    )
}
