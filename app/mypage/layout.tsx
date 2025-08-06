import Script from 'next/script'
import 'react-loading-skeleton/dist/skeleton.css'

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
      ></Script>
      {children}
    </>
  )
}
