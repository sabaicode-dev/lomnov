import React from 'react'
export default function Loading() {
    return (
        <div className='mb-5 m-auto text-center '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="60" height="60">
                <circle cx="25" cy="25" r="20" stroke="#a79962" strokeWidth="6" fill="none" />
                <circle cx="25" cy="25" r="20" stroke="#aeaa99" strokeWidth="6" strokeLinecap="inherit" fill="none" strokeDasharray="125.663706" strokeDashoffset="31.415926" transform="rotate(0 25 25 25)">
                    <animate attributeName="stroke-dashoffset" values="125.663706;0" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>

    )
}
