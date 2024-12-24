
import React, { ChangeEventHandler } from 'react'
import BIcon from '../icons/BIcon';
import StrikethroughIcon from '../icons/StrikethroughIcon';
import UnderlineIcon from '../icons/UnderlineIcon';
import ItalicIcon from '../icons/ItalicIcon';
import LinkIcon from '../icons/LinkIcon';
import ListIcon from '../icons/ListIcon';
import ImageIcon from '../icons/ImageIcon';
import extractName from '@/libs/functions/extractName';

interface ICardPostDescription {
    title?: string;
    values: string | number | readonly string[] | undefined;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    placeholder?: string;
    className?: string;
    name?: string;
    readonly?: boolean;
    errorMsg?: boolean;
}

export default function CardPostDescription({ values, onChange, placeholder, className, readonly, name, title, errorMsg = true }: Readonly<ICardPostDescription>) {
    const named = extractName(name)
    return (
        <div className='w-full mt-7'>
            <p className='text-sm text-helvetica-paragraph'>{title}</p>
            <div className='w-full h-full p-2 rounded-t-[12px] border-gray-[#D9D9D9] border-b-[2px] bg-BgSoftWhite rounded-tl-md rounded-tr-md border-[1.5px] border-[#D9D9D9]'>
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
            <div className='bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] w-full h-full p-2 rounded-b-[12px]'>
                <textarea
                    readOnly={readonly}
                    onChange={onChange}
                    value={values}
                    name={name}
                    className={`${className} w-full h-full border-none focus:ring-0 outline-none bg-transparent`}
                    placeholder={placeholder ?? 'Describe your property'}
                    rows={8}
                    id=""
                />
            </div>
            {errorMsg ? '' : <span className='text-red-700 font-helvetica leading-3 tracking-widest my-3 text-[15px] text-helvetica-paragraph'>{`${named} are require value*`}</span>}

        </div>
    )
}
