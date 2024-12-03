import React from 'react'

export default function PostSelectTransition() {
    return (
        <div className='flex justify-between w-[200px] mt-5 items-center'>
            <div className='flex items-center justify-between'>
                <input type="radio" value={2} name="propertyType" id="sale" className='mr-4 p-2' />
                <span className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph'>Sale</span>
            </div>
            <div>
                <input type="radio" value={1} name="propertyType" id="rent" className='mr-4 p-2' />
                <span className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph'>Rent</span>
            </div>
        </div>
    )
}
