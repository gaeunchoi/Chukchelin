import { Suspense } from 'react'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<LoadingSpinner width={200} />}>
      {children}
    </Suspense>
  )
}
