import { page } from '@/style/custom'
import LoginButton from './_components/LoginButton'
import CopyRight from '@/components/CopyRight'
import LoginSwiper from './_components/LoginSwiper'
import { Suspense } from 'react'

function LoginPage() {
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
