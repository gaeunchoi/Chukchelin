type ReviewImageProps = {
  url: string
  size: number
}

function ReviewImage({ url, size }: ReviewImageProps) {
  return (
    <div
      className="relative overflow-hidden rounded-md"
      style={{ width: 120, height: 120 }}
    >
      <img
        src={url}
        alt="review image"
        width={size}
        height={size}
        className="object-cover rounded-md"
      />
    </div>
  )
}

export default ReviewImage
