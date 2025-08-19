import { useMemo } from 'react'

export const useRedirectUrl = () => {
  return useMemo(() => {
    if (typeof window === 'undefined') return ''

    const currentPath = window.location.pathname
    const currentSearch = window.location.search
    const fullUrl = currentPath + currentSearch
    return encodeURIComponent(fullUrl)
  }, [])
}
