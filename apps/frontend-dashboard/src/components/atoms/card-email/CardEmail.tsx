import { toSubstring } from '@/libs/functions/toSubstring';
import React from 'react';

type CardEmail = {
    email: string;
};

export default function CardEmail({ email }: Readonly<CardEmail>) {
    // Define how many characters you want to display before the ellipsis
    const truncatedEmail = toSubstring(email);
    return (
        <div className='w-[200px] flex justify-start'>
            <p>{truncatedEmail}</p>
        </div>
    );
}
