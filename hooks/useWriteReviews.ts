import useSWR from 'swr'

export const useWriteReviews = () => useSWR('/user/me/review')
