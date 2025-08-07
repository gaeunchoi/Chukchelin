import type { Metadata } from 'next'
import './globals.css'
import { ModalProvider } from '@/contexts/ModalContext'
import SWRProvider from './_components/SWRProvider'
import Modal from '@/components/common/Modal'
import Script from 'next/script'

export const metadata: Metadata = {
  title: '축슐랭',
  description: 'K리그 구장 인근 맛집을 확인해보세요',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <Script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
      ></Script>
      <body className="antialiased">
        <ModalProvider>
          <SWRProvider>{children}</SWRProvider>
          <Modal />
        </ModalProvider>
      </body>
    </html>
  )
}
