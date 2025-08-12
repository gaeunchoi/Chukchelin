import { Review } from '@/types/review'
import { axiosInstance } from './axiosInstance'
import axios from 'axios'

export const getPresignedUrl = async (image: File) => {
  const res = await axiosInstance.post('/upload/presigned-url', {
    mimeType: image.type,
  })

  return res.data
}

export const uploadImages = async (images: File[]) => {
  const uploadedImages: string[] = []

  await Promise.all(
    images.map(async (image) => {
      const { presignedUrl, fullPath } = await getPresignedUrl(image)
      await axios.put(presignedUrl, image)
      uploadedImages.push(fullPath)
    }),
  )

  return uploadedImages
}

export const createReview = async (
  restaurantId: number,
  review: Pick<Review, 'content' | 'score'>,
  review_image?: File[],
) => {
  const uploadedImages: string[] = await uploadImages(
    review_image || [],
  )

  const res = await axiosInstance.post(
    `/restaurant/${restaurantId}/review`,
    {
      ...review,
      imageUrls: uploadedImages,
    },
  )
  return res.data
}

export const deleteReview = async (reviewId: number) => {
  const res = await axiosInstance.delete(`/review/${reviewId}`)
  return res.data
}
