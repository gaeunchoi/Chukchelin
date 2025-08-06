'use client'

import { SWRConfig } from 'swr'
import { axiosInstance } from '@/services/axiosInstance'

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SWRConfig
      value={{
        fetcher: (url, options) =>
          axiosInstance.get(url, options).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  )
}
