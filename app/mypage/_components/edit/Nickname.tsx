import { flexCol } from '@/style/custom'

type NicknameProps = {
  nickname: string
  onChange: (nickname: string) => void
}

function Nickname({ nickname, onChange }: NicknameProps) {
  return (
    <div className={flexCol('w-full', 'items-start')}>
      <label
        htmlFor="nickname"
        className="text-[14px] font-semibold"
      >
        닉네임
      </label>
      <input
        type="text"
        name="nickname"
        value={nickname}
        onChange={(e) => onChange(e.target.value)}
        placeholder="변경할 닉네임을 입력해주세요"
        className="w-full h-10 px-4 border border-gray-300 focus:outline-solid outline-blue-500 rounded-md placeholder:text-xs"
      />
    </div>
  )
}

export default Nickname
