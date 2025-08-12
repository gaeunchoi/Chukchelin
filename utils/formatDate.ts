import dayjs from 'dayjs'

export const formatDate = (date: string) => {
  return dayjs(date).format('MM월 DD일 HH시 mm분')
}
