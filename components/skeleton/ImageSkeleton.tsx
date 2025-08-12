import Skeleton from 'react-loading-skeleton'

type ImageSkeletonProps = {
  size: number
  isCircle?: boolean
}

function ImageSkeleton({ size, isCircle }: ImageSkeletonProps) {
  return (
    <div
      className="overflow-hidden rounded-md"
      style={{ minWidth: size, minHeight: size }}
    >
      <Skeleton
        circle={isCircle}
        width={size}
        height={size}
      />
    </div>
  )
}

export default ImageSkeleton
