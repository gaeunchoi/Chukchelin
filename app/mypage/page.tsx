import { page } from '@/style/custom'
import UserProfile from './_components/UserProfile'
import TabContent from './_components/TabContent'

function MyPage() {
  return (
    <div className={page()}>
      <UserProfile editMode={false} />
      <TabContent />
    </div>
  )
}

export default MyPage
