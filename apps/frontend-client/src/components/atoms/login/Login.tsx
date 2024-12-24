import { useTranslation } from '@/hook/useTranslation'
import Link from 'next/link'
import React from 'react'
export default function Login() {
    const { t } = useTranslation();
    return (
        <Link
            href="/signin"
            className="md:py-[5px] md:px-5 py-[5px] px-4 border-[1px] md:border-[2px] border-[#E5D2B0] rounded-[8px] md:text-[18px] text-white md:font-[600] font-[500] hover:border-white hover:scale-105 active:border-white active:scale-95 transition-transform duration-150"
        >
            {t("login")}
        </Link>
    )
}
