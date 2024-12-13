import Header from '@/components/organisms/header/Header'
import Sidebar from '@/components/organisms/sidebar/Sidebar '
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="m-[40px] w-[100%] border-2 border-green-950">
                    {children}
                </div>
            </div>
        </div>
    )
}
