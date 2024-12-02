import BIcon from '@/icons/BIcon'
import ImageIcon from '@/icons/ImageIcon'
import ItalicIcon from '@/icons/ItalicIcon'
import LinkIcon from '@/icons/LinkIcon'
import ListIcon from '@/icons/ListIcon'
import StrikethroughIcon from '@/icons/StrikethroughIcon'
import UnderlineIcon from '@/icons/UnderlineIcon'
import React from 'react'

export default function PostRichEditor() {
    return (
        <div className='w-full mt-7'>
            <p className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph'>Detail*</p>
            <div className='bg-gray-50 shadow-md w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px]'>
                <div className='w-[380px] h-auto flex justify-between items-center'>
                    <BIcon width='25' />
                    <StrikethroughIcon width='25' />
                    <UnderlineIcon width='25' />
                    <ItalicIcon width='25' />
                    <LinkIcon width='25' />
                    <ListIcon width='25' />
                    <ImageIcon width='25' />
                </div>
            </div>
            <div className='bg-white shadow-md w-full h-full p-2 rounded-b-[12px]'>
                <textarea name="" className='w-full h-full border-none focus:ring-0 outline-none' placeholder='Describe your property' rows={8} id=""></textarea>
            </div>
        </div>
    )
}
