'use client'
import LogoSwiper from './_component/LogoSwiper'
import LoginBtn from './_component/LoginBtn'
import CopyRight from '@/components/CopyRight'

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 gap-6">
      <LogoSwiper />
      <LoginBtn />
      <CopyRight />
    </div>
  )
}

export default LoginPage
