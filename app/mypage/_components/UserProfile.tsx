'use client'
import { LogOut, Settings } from 'lucide-react'
import UserProfileSkeleton from './skeletons/UserProfileSkeleton'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useAuthStore } from '@/store/useAuthStore'
import { useModalContext } from '@/contexts/ModalContext'
import LogoImage from '@/components/image/LogoImage'
import {
  flexCol,
  flexColICenter,
  flexRowICenter,
} from '@/style/custom'
import ProfileImage from '@/components/image/ProfileImage'
import ProfileImageEditButton from './edit/ProfileImageEditButton'
import { track } from '@amplitude/analytics-browser'

type UserProfileProps = {
  editMode: boolean
}

function UserProfile({ editMode }: UserProfileProps) {
  const router = useRouter()
  const { data: loggedInUser } = useUser()
  const { userLogout } = useAuthStore()
  const { openModal } = useModalContext()

  const handleEditClick = () => {
    track('Mypage | Edit Clicked', {
      page_name: 'MyPage Edit',
      page_path: '/mypage/edit',
    })
    router.replace('/mypage/edit')
  }

  const handleLogout = () => {
    track('Mypage | Logout Clicked')

    openModal({
      title: '로그아웃',
      description: '로그아웃이 완료되었습니다.',
      onAction: () => {
        userLogout()
        router.push('/')
      },
    })
  }

  if (!loggedInUser)
    return <UserProfileSkeleton editMode={editMode} />

  if (editMode) {
    return (
      <div className={flexColICenter('gap-7')}>
        <ProfileImage
          url={loggedInUser.profile_image_url}
          size={120}
        >
          <ProfileImageEditButton />
        </ProfileImage>
        <div className={flexColICenter()}>
          <div className={flexRowICenter('gap-1')}>
            <span className="font-bold text-[18px]">
              {loggedInUser.nickname || '닉네임 없음'}
            </span>
            {loggedInUser.favorite_team && (
              <LogoImage
                url={loggedInUser.favorite_team?.logo_image_url}
                size={19}
              />
            )}
          </div>
          <div className="text-gray-400 text-[14px] font-medium">
            <span className="font-bold">{loggedInUser.id}</span>번째
            가입 · 평균 별점{' '}
            <span className="font-bold">
              {loggedInUser.review_average_score?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={flexRowICenter('w-full', 'gap-3')}>
      <ProfileImage
        url={loggedInUser.profile_image_url}
        size={64}
      />
      <div className={flexRowICenter('justify-between', 'w-full')}>
        <div className={flexCol('justify-start')}>
          <div className={flexRowICenter('gap-1')}>
            <div className="font-bold text-[18px]">
              {loggedInUser.nickname}
            </div>
            {loggedInUser.favorite_team && (
              <LogoImage
                url={loggedInUser.favorite_team?.logo_image_url}
                size={19}
              />
            )}
          </div>
          <div className="text-gray-400 text-[14px] font-medium">
            <span className="font-bold">{loggedInUser.id}</span>번째
            가입 · 평균 별점{' '}
            <span className="font-bold">
              {loggedInUser.review_average_score?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>
        <div className={flexRowICenter('gap-4')}>
          <Settings
            size={24}
            color="black"
            strokeWidth={3}
            onClick={handleEditClick}
          />
          <LogOut
            size={20}
            color="gray"
            strokeWidth={3}
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
