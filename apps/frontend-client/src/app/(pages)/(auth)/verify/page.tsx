import VerifyAccount from '@/components/organisms/auth/verify/VerifyAccount'
import React, { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyAccount />
    </Suspense>
  )
}
