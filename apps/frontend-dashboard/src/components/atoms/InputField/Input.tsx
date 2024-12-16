import React, { ChangeEvent } from 'react'
interface IInputFieldProps {
    title?: string;
    values: string | number | readonly string[] | undefined;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string
    types?: string;
    className?: string
    name?: string;
    readonly?: boolean;
    errorMsg?: boolean;
    htmlFor?: string;
    id?: string;
}
export default function Input({ title, id, htmlFor, values, onChange, placeholder, types, className, name, readonly, errorMsg }: Readonly<IInputFieldProps>) {
    return (
        <>
            <label htmlFor={htmlFor}>{title}</label>
            <input
                type={types}
                id={id}
                value={values ?? ''}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readonly}
                name={name}
                className={`text-Black w-[100%] h-[40px] rounded-sm p-[10px] border-2 focus:outline-none focus:border-Primary/20 ${className ?? ''}`}
            />
            {errorMsg ? '' : <span className='text-red-700 font-helvetica leading-3 tracking-widest my-3 text-[15px] text-helvetica-paragraph'>{`${name} are require value*`}</span>}
        </>
    )
}
