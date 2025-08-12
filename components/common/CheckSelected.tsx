import { flexRowICenter } from '@/style/custom'
import { Check } from 'lucide-react'

function CheckSelected() {
  return (
    <div className={flexRowICenter()}>
      <div className="text-[14px] text-[#4452C3] font-semibold">
        선택됨
      </div>
      <Check
        size={16}
        color="#4452C3"
        strokeWidth={3}
      />
    </div>
  )
}

export default CheckSelected
