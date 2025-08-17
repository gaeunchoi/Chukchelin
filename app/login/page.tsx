'use client'
import { page } from '@/style/custom'
import LoginButton from './_components/LoginButton'
import CopyRight from '@/components/CopyRight'
import LoginSwiper from './_components/LoginSwiper'
import { Suspense, useEffect } from 'react'
import { track } from '@amplitude/analytics-browser'

function LoginPage() {
  useEffect(() => {
    track('Auth | Login Page Viewed', {
      page_name: 'Login',
      page_path: '/login',
    })
  }, [])

  return (
    <div className={page('justify-center')}>
      <LoginSwiper />
      <Suspense>
        <LoginButton />
      </Suspense>
      <CopyRight />
    </div>
  )
}

export default LoginPage
