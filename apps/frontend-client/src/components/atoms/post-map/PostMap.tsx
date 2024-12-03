import React, { ChangeEvent } from 'react'
import PostInputField from '../post-input-field/PostInputField'
import Map from '@/components/molecules/map/Map'

export default function PostMap({ values, onChange }: { values?: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    console.log(values);

    return (
        <>
            <div className="bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]">
                <div className="w-[380px] h-auto flex justify-between items-center">
                    <span className="font-helvetica leading-3 tracking-widest my-3 text-[18px] font-bold text-gray-700 text-helvetica-paragraph">Map*</span>
                </div>
            </div>
            <div className="bg-white shadow-md w-full h-full rounded-b-[12px] px-[12px] py-[10px]">
                <div className='w-full h-full  flex flex-1 gap-9 px-[20px]'>
                    <PostInputField onChange={onChange} values={values} name='urlmap' className='border border-[#D9D9D9] shadow-sm ' placeholder='google map link!' />
                </div>
                <div className='w-full h-full -mt-8 -ml-5'>
                    <Map property={values || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509658!2d144.95592731584442!3d-37.81720977975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xb69b6c8f7c0f89c!2sMelbourne!5e0!3m2!1sen!2sau!4v1510911234567'} />
                </div>
            </div>
        </>
    )
}
