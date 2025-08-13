import { flexCol } from '@/style/custom'

type ReviewFormTitleProps = {
  restaurantName: string
}

function ReviewFormTitle({ restaurantName }: ReviewFormTitleProps) {
  return (
    <div className={flexCol()}>
      <div className="text-[18px] font-bold">{restaurantName}</div>
      <div className="text-[16px] text-[#030303]">
        에 방문하신 경험은 어떠신가요?
      </div>
    </div>
  )
}

export default ReviewFormTitle
