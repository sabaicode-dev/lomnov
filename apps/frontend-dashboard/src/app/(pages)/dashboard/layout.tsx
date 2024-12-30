'use client'
import Header from '@/components/organisms/header/Header'
import Sidebar from '@/components/organisms/sidebar/Sidebar '
import { useAuth } from '@/context/useAuth'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useAuth();
    return (
        <div className="flex flex-col">
            <Header profile={user?.profile}/>
            <div className="flex">
                <Sidebar />
                <div className="m-[40px] w-[100%]">
                    {children}
                </div>
            </div>
        </div>
    )
}
