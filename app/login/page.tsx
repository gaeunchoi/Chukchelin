import { page } from '@/style/custom'
import LoginButton from './_components/LoginButton'
import CopyRight from '@/components/CopyRight'
import LoginSwiper from './_components/LoginSwiper'

function LoginPage() {
  return (
    <div className={page('justify-center')}>
      <LoginSwiper />
      <LoginButton />
      <CopyRight />
    </div>
  )
}

export default LoginPage
