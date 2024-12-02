import React, { useState } from 'react'
const properties = [
    { name: "land" },
    { name: "villa" },
    { name: "home" },
    { name: "shop" },

];
interface IPostSelectFieldProps {
    zIndex?: string;
    title?: string;
    placholer:string
}
export default function PostSelectField({ zIndex ,title , placholer}: IPostSelectFieldProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(placholer ? placholer : 'Properties');
    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);

    };
    return (
        <div className={` ${zIndex ? `z-${zIndex}` : 'z-10'} w-full h-[80%] flex flex-1 gap-9 justify-between items-center mt-1`}>
            <div className='w-full'>
                <p className='font-helvetica leading-3 tracking-widest my-3 text-[18px] text-helvetica-paragraph'>{title}*</p>
                <div className="relative w-full">
                    <button
                        type='button'
                        onClick={() => setIsOpen(!isOpen)}
                        className='flex items-center justify-between w-full rounded-lg border-none bg-white shadow-sm py-[13px] px-[12px] focus:ring-olive-green focus:outline-none focus:ring-2'
                    >
                        <span className="text-gray-700">{selectedOption}</span>
                        <svg
                            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div
                            className="absolute left-0 right-0 mt-2 bg-[#E0E0DC] shadow-lg rounded-md max-h-60 overflow-auto p-2"
                        >
                            {properties.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleOptionClick(option.name)}
                                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-olive-green rounded-md"
                                >
                                    <span className="text-black text-[14px] hover:text-white w-full capitalize">
                                        {option.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
