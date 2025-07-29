import Image from 'next/image'
import Link from 'next/link'

const LoginBtnAttr: Record<string, string> = {
  label: '카카오로 시작하기',
  bgColor: '#FEE500',
  imageUrl: '/kakao.png',
  authUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`,
}

function LoginBtn() {
  return (
    <Link
      href={LoginBtnAttr.authUrl}
      className="w-full p-3 flex flex-row items-center justify-center gap-2 rounded-lg hover:opacity-90 transition-opacity"
      style={{ backgroundColor: LoginBtnAttr.bgColor }}
    >
      <Image
        src={LoginBtnAttr.imageUrl}
        alt="oauth Logo"
        height={18}
        width={18}
        style={{ height: 'auto' }}
      />
      <span className="font-semibold">{LoginBtnAttr.label}</span>
    </Link>
  )
}

export default LoginBtn
