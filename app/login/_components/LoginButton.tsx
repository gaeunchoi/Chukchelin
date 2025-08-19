'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer'
import {
  flexCol,
  flexRowICenter,
  flexRowIJCenter,
} from '@/style/custom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { termLabel, TermOption } from '@/constants/termLabel'
import { track } from '@amplitude/analytics-browser'

interface TermsState {
  allChecked: boolean
  agreedTerms: boolean[]
  isDrawerOpen: boolean
}

interface TermsContentProps {
  isAll?: boolean
  isChecked: boolean
  termContent: string | TermOption
  onClick: () => void
}

const TermsContent = ({
  isAll,
  isChecked,
  termContent,
  onClick,
}: TermsContentProps) => {
  const router = useRouter()

  const handleViewTerms = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      track('Auth | Terms Viewed')
      router.push(`/login/terms/${termContent}`)
    },
    [termContent],
  )

  const handleCheckboxClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onClick()
    },
    [onClick],
  )

  return (
    <div
      className={flexRowICenter(
        'gap-2',
        'text-[14px]',
        'text-black',
        { 'font-bold': isAll, 'font-medium': !isAll },
      )}
    >
      <div
        className={flexRowICenter('gap-2')}
        onClick={handleCheckboxClick}
      >
        <Checkbox
          checked={isChecked}
          className={cn(
            isAll &&
              'data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white',
          )}
          onClick={handleCheckboxClick}
        />
        <span className="flex-1 cursor-pointer">
          {termLabel[termContent as TermOption] || termContent}
        </span>
      </div>

      {!isAll && (
        <span
          className="text-[10px] text-[#838383] cursor-pointer hover:text-blue-600 z-1"
          onClick={handleViewTerms}
        >
          보기
        </span>
      )}
    </div>
  )
}

function LoginButton() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const [state, setState] = useState<TermsState>({
    allChecked: false,
    agreedTerms: [false, false],
    isDrawerOpen: false,
  })

  const restoreStateFromURL = useCallback(() => {
    const drawerOpen = searchParams.get('drawer') === 'true'
    const term1 = searchParams.get('term1') === 'true'
    const term2 = searchParams.get('term2') === 'true'

    setState((prev) => ({
      ...prev,
      agreedTerms: [term1, term2],
      isDrawerOpen: drawerOpen,
    }))
  }, [searchParams])

  const updateURL = useCallback(
    (newState: Partial<TermsState>) => {
      const params = new URLSearchParams(searchParams)
      let hasChanges = false

      if (newState.agreedTerms !== undefined) {
        newState.agreedTerms.forEach((agreed, index) => {
          if (agreed) {
            params.set(`term${index + 1}`, 'true')
          } else {
            params.delete(`term${index + 1}`)
          }
          hasChanges = true
        })
      }

      if (newState.isDrawerOpen !== undefined) {
        if (newState.isDrawerOpen) {
          params.set('drawer', 'true')
        } else {
          params.delete('drawer')
        }
        hasChanges = true
      }

      if (hasChanges) {
        router.replace(`/login?${params.toString()}`, {
          scroll: false,
        })
      }
    },
    [searchParams],
  )

  const updateAllChecked = useCallback((agreedTerms: boolean[]) => {
    const allChecked = agreedTerms.every((term) => term)
    setState((prev) => ({ ...prev, allChecked }))
  }, [])

  const handleDrawerOpenChange = useCallback(
    (open: boolean) => {
      setState((prev) => ({ ...prev, isDrawerOpen: open }))
      updateURL({ isDrawerOpen: open })
    },
    [updateURL],
  )

  const handleAllCheckedChange = useCallback(() => {
    const newAllState = !state.allChecked
    const newAgreedTerms = state.agreedTerms.map(() => newAllState)

    setState((prev) => ({
      ...prev,
      allChecked: newAllState,
      agreedTerms: newAgreedTerms,
    }))
    updateURL({ agreedTerms: newAgreedTerms })
  }, [state.allChecked, state.agreedTerms, updateURL])

  const handleAgreeTermClick = useCallback((termIdx: number) => {
    setState((prev) => {
      const newAgreedTerms = [...prev.agreedTerms]
      newAgreedTerms[termIdx] = !newAgreedTerms[termIdx]
      return { ...prev, agreedTerms: newAgreedTerms }
    })
  }, [])

  const handleLoginClick = useCallback(() => {
    const targetUrl =
      redirect || window.location.pathname + window.location.search
    const encodedUrl = encodeURIComponent(targetUrl)

    router.push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&state=${encodedUrl}`,
    )
  }, [router, redirect])

  useEffect(() => {
    restoreStateFromURL()
  }, [restoreStateFromURL])

  useEffect(() => {
    updateURL({ agreedTerms: state.agreedTerms })
  }, [state.agreedTerms, updateURL])

  useEffect(() => {
    updateAllChecked(state.agreedTerms)
  }, [state.agreedTerms, updateAllChecked])

  return (
    <Drawer
      open={state.isDrawerOpen}
      onOpenChange={handleDrawerOpenChange}
    >
      <DrawerTrigger asChild>
        <div className="w-full cursor-pointer">
          <Button
            className={flexRowIJCenter(
              'w-full',
              'bg-[#FEE500]',
              'rounded-lg',
              'hover:bg-[#E6CC00]',
              'transition-opacity',
            )}
            onClick={() => track('Auth | Login Button Clicked')}
          >
            <img
              src="/kakao.png"
              alt="kakao Logo"
              height={18}
              width={18}
            />
            <span className="font-semibold text-black">
              카카오로 시작하기
            </span>
          </Button>
        </div>
      </DrawerTrigger>

      <DrawerContent className={flexCol('z-1000', 'pb-8')}>
        <DrawerHeader className={flexCol('gap-8', 'flex-shrink-0')}>
          <DrawerTitle>약관 동의</DrawerTitle>
          <DrawerDescription asChild>
            <div className="sr-only">
              카카오 로그인 시 약관 동의가 필요합니다.
            </div>
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className={flexCol('w-full', 'gap-8')}>
            <TermsContent
              isChecked={state.allChecked}
              termContent="전체 약관 동의"
              onClick={handleAllCheckedChange}
              isAll
            />
            <TermsContent
              isChecked={state.agreedTerms[0]}
              termContent={TermOption.TERM_OF_SERVICE}
              onClick={() => handleAgreeTermClick(0)}
            />
            <TermsContent
              isChecked={state.agreedTerms[1]}
              termContent={TermOption.PRIVACY_POLICY}
              onClick={() => handleAgreeTermClick(1)}
            />
          </div>
        </div>

        <DrawerFooter className="flex-shrink-0 w-full">
          <Button
            className="text-[16px] font-semibold p-6"
            onClick={handleLoginClick}
            disabled={!state.allChecked}
          >
            로그인
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default LoginButton
