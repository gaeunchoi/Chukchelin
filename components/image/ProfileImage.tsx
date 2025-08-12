import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type ProfileImageProps = {
  url: string
  size: number
  children?: ReactNode
}

function ProfileImage({ url, size, children }: ProfileImageProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ minWidth: size, minHeight: size }}
    >
      <img
        src={url}
        width={size}
        height={size}
        className={cn('rounded-full')}
      />
      {children}
    </div>
  )
}

export default ProfileImage
