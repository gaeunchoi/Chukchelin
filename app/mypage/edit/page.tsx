'use client'
import { useUser } from '@/hooks/useUser'
import { page } from '@/style/custom'
import NotAllowAuth from '../_components/NotAllowAuth'
import MypageHeader from '../_components/MypageHeader'
import UserProfile from '../_components/UserProfile'
import UserProfileForm from '../_components/edit/UserProfileForm'

function ProfileEditPage() {
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
