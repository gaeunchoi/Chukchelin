import { useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const useRedirectUrl = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useMemo(() => {
    if (typeof window === 'undefined') return ''

    const currentPath = pathname
    const currentSearch = searchParams.toString()
    const fullUrl =
      currentPath + (currentSearch ? `?${currentSearch}` : '')
    return encodeURIComponent(fullUrl)
  }, [pathname, searchParams])
}
