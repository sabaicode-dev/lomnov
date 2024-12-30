"use client";

import React from "react";

interface InputFieldProps {
    label: string;
    placeholder: string;
    value: string ;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    value,
    onChange,
    readOnly = false,
}) => {
    return (
        <div className="w-full ">
            <label className="block text-sm font-medium">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                className="w-full h-10 p-2 mt-1 text-sm rounded-lg bg-gray-50 border border-gray-300 focus:outline-none"
            />
        </div>
    );
};

export default InputField;
