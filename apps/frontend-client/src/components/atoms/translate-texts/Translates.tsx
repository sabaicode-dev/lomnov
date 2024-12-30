'use client';
import { useTranslation } from '@/hook/useTranslation';
import React from 'react'
type TextsProps = {
    className?: string;
    translateKey: string;
}
function Translates({ className ,translateKey}: TextsProps) {
    const { t } = useTranslation();
    return (
        <span className={className}>
            {t(translateKey)}
        </span>
    )
}

export default Translates
