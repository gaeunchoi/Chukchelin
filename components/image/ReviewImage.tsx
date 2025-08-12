type ReviewImageProps = {
  url: string
  size: number
}

function ReviewImage({ url, size }: ReviewImageProps) {
  return (
    <img
      src={url}
      alt="review image"
      width={size}
      height={size}
      className="object-cover rounded-md"
      style={{ minWidth: size, minHeight: size }}
    />
  )
}

export default ReviewImage
