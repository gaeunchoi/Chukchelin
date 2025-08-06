type CategoryImageProps = {
  size: number
  url: string
}
function CategoryImage({ size, url }: CategoryImageProps) {
  return (
    <img
      src={url}
      alt="category image"
      width={size}
      height={size}
      className="rounded-md"
    />
  )
}

export default CategoryImage
