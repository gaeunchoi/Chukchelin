'use client'
import { Settings } from 'lucide-react'
import UserProfileSkeleton from './skeletons/UserProfileSkeleton'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import LogoImage from '@/components/image/LogoImage'
import {
  flexCol,
  flexColICenter,
  flexRowICenter,
} from '@/style/custom'

type UserProfileProps = {
  editMode: boolean
}

function UserProfile({ editMode }: UserProfileProps) {
  const router = useRouter()
  const { data: loggedInUser } = useUser()

  if (!loggedInUser)
    return <UserProfileSkeleton editMode={editMode} />

  if (editMode) {
    return (
      <div className={flexColICenter('gap-7')}>
        <img
          src={loggedInUser.profile_image_url}
          alt="profile image"
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
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
              {loggedInUser.review_averate_score || '0.0'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={flexRowICenter('w-full', 'gap-3')}>
      <img
        src={loggedInUser.profile_image_url}
        alt="profile image"
        width={64}
        height={64}
        className="rounded-full object-cover"
      />
      <div className={flexRowICenter('justify-between', 'w-full')}>
        <div className={flexCol('justify-start')}>
          <div className={flexRowICenter('gap-1')}>
            <div className="font-bold text-[18px]">
              {loggedInUser.nickname}
            </div>
            <LogoImage
              url={loggedInUser.favorite_team?.logo_image_url}
              size={19}
            />
          </div>
          <div className="text-gray-400 text-[14px] font-medium">
            <span className="font-bold">{loggedInUser.id}</span>번째
            가입 · 평균 별점{' '}
            <span className="font-bold">
              {loggedInUser.review_averate_score || '0.0'}
            </span>
          </div>
        </div>
        <div className={flexRowICenter()}>
          <Settings
            size={24}
            color="black"
            onClick={() => router.push('/mypage/edit')}
          />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
