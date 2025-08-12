'use client'
import Script from 'next/script'

function KakaoScript() {
  const onLoadKakao = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
  }

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js"
      async
      integrity="sha384-WAtVcQYcmTO/N+C1N+1m6Gp8qxh+3NlnP7X1U7qP6P5dQY/MsRBNTh+e1ahJrkEm"
      crossOrigin="anonymous"
      onLoad={onLoadKakao}
    />
  )
}

export default KakaoScript
