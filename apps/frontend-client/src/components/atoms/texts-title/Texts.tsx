'use client';
import { useTranslation } from '@/hook/useTranslation';
import React from 'react'
type TextsProps = {
    className?: string;
    translateKey: string;
}
function Texts({ className ,translateKey}: TextsProps) {
    const { t } = useTranslation();
    return (
        <p className={className}>
            {t(translateKey)}
        </p>
    )
}

export default Texts
