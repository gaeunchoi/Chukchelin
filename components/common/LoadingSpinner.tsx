import { flexColIJCenter } from '@/style/custom'
import { BarLoader } from 'react-spinners'

type LoadingSpinnerProps = {
  width: number
}

function LoadingSpinner({ width }: LoadingSpinnerProps) {
  return (
    <div className={flexColIJCenter('w-full')}>
      <BarLoader
        color="#000"
        width={width}
      />
    </div>
  )
}

export default LoadingSpinner
