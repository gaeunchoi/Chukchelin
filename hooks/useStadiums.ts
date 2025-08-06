import useSWR from 'swr'

export const useStadiums = () => useSWR('/stadium')
