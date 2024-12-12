import React from 'react';

type CardEmail = {
    email: string;
};

export default function CardEmail({ email }: CardEmail) {
    // Define how many characters you want to display before the ellipsis
    const maxLength = 20;
    const truncatedEmail = email.length > maxLength ? email.substring(0, maxLength) + '...' : email;
    return (
        <div className='w-[200px] flex justify-start'>
            <p>{truncatedEmail}</p>
        </div>
    );
}
