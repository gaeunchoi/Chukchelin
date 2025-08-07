import useSWR from 'swr'

export const useSearchResult = (keyword: string) =>
  useSWR(`/search?query=${keyword}`)
