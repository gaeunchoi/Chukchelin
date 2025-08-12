'use client'
import { useUser } from '@/hooks/useUser'
import { page } from '@/style/custom'
import { Suspense } from 'react'
import NotAllowAuth from './_components/NotAllowAuth'
import MypageHeader from './_components/MypageHeader'
import UserProfile from './_components/UserProfile'
import TabContent from './_components/mypageDetail/TabContent'

function MyPage() {
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
