'use client'
import { useUser } from '@/hooks/useUser'
import { page } from '@/style/custom'
import { Suspense, useEffect } from 'react'
import NotAllowAuth from './_components/NotAllowAuth'
import MypageHeader from './_components/MypageHeader'
import UserProfile from './_components/UserProfile'
import TabContent from './_components/detail/TabContent'
import { track } from '@amplitude/analytics-browser'

function MyPage() {
  useEffect(() => {
    track('MyPage | MyPage Viewed', {
      page_name: 'MyPage',
      page_path: '/mypage',
    })
  }, [])

  const { error: notLoggedIn } = useUser()
  if (notLoggedIn) return <NotAllowAuth />

  return (
    <div className={page()}>
      <MypageHeader />
      <UserProfile editMode={false} />
      <Suspense fallback={<div>suspense loading</div>}>
        <TabContent />
      </Suspense>
    </div>
  )
}

export default MyPage
