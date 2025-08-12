'use client'
import { useUser } from '@/hooks/useUser'
import { page } from '@/style/custom'
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
      <TabContent />
    </div>
  )
}

export default MyPage
