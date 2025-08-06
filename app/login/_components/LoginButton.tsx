import Link from 'next/link'

function LoginButton() {
  return (
    <Link
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`}
      className="bg-[#FEE500] w-full p-3 flex flex-row items-center justify-center gap-2 rounded-lg hover:opacity-90 transition-opacity"
    >
      <img
        src={'/kakao.png'}
        alt="kakao Logo"
        height={18}
        width={18}
      />
      <span className="font-semibold">카카오로 시작하기</span>
    </Link>
  )
}

export default LoginButton
