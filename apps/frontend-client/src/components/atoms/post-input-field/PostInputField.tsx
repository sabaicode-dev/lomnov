import React, { ChangeEvent } from 'react'

interface IPostInputFieldProps {
  title?: string;
  values?: string | number | readonly string[] | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string
  types?: string;
  className?: string
}

export default function PostInputField({ title, values, onChange, className, placeholder, types }: IPostInputFieldProps) {
  return (
    <div className='w-1/2'>
      <p className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph'>{title}</p>
      <input value={values} onChange={onChange} className={`${className ? `${className} w-full rounded-lg bg-white py-[13px] px-[12px] focus:ring-olive-green focus:outline-none focus:ring-2 shadow-sm` : 'w-full rounded-lg border-none  bg-white shadow-sm py-[13px] px-[12px] focus:ring-olive-green focus:outline-none focus:ring-2'} `} placeholder={placeholder} type={types} />
    </div>
  )
}
