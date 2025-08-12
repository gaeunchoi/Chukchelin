import useSWR from 'swr'

export const useMyReviews = () => useSWR('/user/me/review')
