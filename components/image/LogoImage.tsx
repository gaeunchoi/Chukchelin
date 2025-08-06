type LogoImageProps = {
  url: string
  size: number
}

function LogoImage({ url, size }: LogoImageProps) {
  return (
    <img
      src={url}
      alt="logo image"
      width={size}
      height={size}
    />
  )
}

export default LogoImage
