import { page } from '@/style/custom'
import UserProfile from '../_components/UserProfile'
import UserProfileForm from '../_components/UserProfileForm'

function ProfileEditPage() {
  return (
    <div className={page('gap-9')}>
      <UserProfile editMode={true} />
      <UserProfileForm />
    </div>
  )
}

export default ProfileEditPage
