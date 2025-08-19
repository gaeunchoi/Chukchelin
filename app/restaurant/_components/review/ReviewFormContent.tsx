import { flexCol } from '@/style/custom'

type ReviewFormContentProps = {
  content: string
  onChange: (content: string) => void
}

const ReviewFormContent = ({
  content,
  onChange,
}: ReviewFormContentProps) => (
  <div className={flexCol('w-full', 'gap-[17px]')}>
    <div className="relative">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="최소 10자 이상 입력해주세요"
        maxLength={300}
        className={flexCol(
          'w-full',
          'h-[200px]',
          'border',
          'border-gray-300',
          'rounded-md',
          'p-4',
          'resize-none',
          'text-[14px]',
        )}
      />
      <div className="absolute bottom-2 right-2 text-[12px] font-medium text-[#818181]">
        <span className="text-black font-bold">{content.length}</span>{' '}
        / 300
      </div>
    </div>

    <div
      className={flexCol(
        'text-[12px]',
        'text-[#A8A8A8]',
        'font-medium',
      )}
    >
      <p>
        1. 별점과 리뷰 내용은 필수이며, 리뷰 내용은 최소 10자 이상
        작성해야 합니다.
      </p>
      <p>
        2. 리뷰는 수정이 불가능하며, 변경을 원하실 경우 삭제 후 다시
        작성해 주시기 바랍니다.
      </p>
      <p>3. 타인을 비방하거나 모욕하는 내용은 삭제될 수 있습니다.</p>
      <p>
        4. 욕설, 혐오 표현, 불건전한 언어는 운영 방침에 따라 제재될 수
        있습니다.
      </p>
      <p>
        5. 광고, 도배, 허위 정보 작성 시 이용이 제한될 수 있습니다.
      </p>
    </div>
  </div>
)

export default ReviewFormContent
