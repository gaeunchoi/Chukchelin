'use client'
import { termLabel, TermOption } from '@/constants/termLabel'
import { flexCol, header, page, stickyButton } from '@/style/custom'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import LoginTerm from '../../_components/LoginTerm'

function TermsPage() {
  const router = useRouter()
  const { title } = useParams()

  const handleButtonClick = () => {
    router.back()
  }

  return (
    <div className={page()}>
      <div
        className={header(
          'justify-center',
          'text-[18px]',
          'font-bold',
        )}
      >
        {termLabel[title as TermOption]}
      </div>
      <div className={flexCol('w-full', 'gap-4')}>
        <LoginTerm />
      </div>
      <Button
        className={stickyButton()}
        onClick={handleButtonClick}
      >
        돌아가기
      </Button>
    </div>
  )
}

export default TermsPage
