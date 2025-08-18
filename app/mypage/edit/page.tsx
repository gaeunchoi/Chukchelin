'use client'
import { useUser } from '@/hooks/useUser'
import { page } from '@/style/custom'
import NotAllowAuth from '../../../components/common/NotAllowAuth'
import MypageHeader from '../_components/MypageHeader'
import UserProfile from '../_components/UserProfile'
import UserProfileForm from '../_components/edit/UserProfileForm'
import { track } from '@amplitude/analytics-browser'
import { useEffect } from 'react'

function ProfileEditPage() {
  useEffect(() => {
    track('MyPage | MyPage Edit Viewed', {
      page_name: 'MyPage Edit',
      page_path: '/mypage/edit',
    })
  }, [])

  const { error: notLoggedIn } = useUser()
  if (notLoggedIn) return <NotAllowAuth />

  return (
    <div className={page('gap-9')}>
      <MypageHeader isEditPage={true} />
      <UserProfile editMode={true} />
      <UserProfileForm />
    </div>
  )
}

export default ProfileEditPage
