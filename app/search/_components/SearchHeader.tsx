'use client'
import { useRouter } from 'next/navigation'
import { useSearchKeywordContext } from '@/contexts/SearchKeywordContext'
import { useDebouncedCallback } from 'use-debounce'
import { useState } from 'react'
import { header } from '@/style/custom'
import { flexRowICenter } from '@/style/custom'
import { ChevronLeft, Search } from 'lucide-react'

function SearchHeader() {
  const router = useRouter()
  const { setSearchKeyword } = useSearchKeywordContext()
  const [inputValue, setInputValue] = useState('')

  const debouncedSetSearchKeyword = useDebouncedCallback(
    (value: string) => {
      setSearchKeyword(value)
    },
    500,
  )

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value
    setInputValue(value)
    debouncedSetSearchKeyword(value)
  }

  return (
    <div className={header()}>
      <div className={flexRowICenter('w-full', 'gap-4')}>
        <ChevronLeft
          size={18}
          color="black"
          onClick={() => router.back()}
        />
        <div
          className={flexRowICenter(
            'w-full',
            'p-2.5',
            'rounded-sm',
            'bg-[#F2F2F2]',
          )}
        >
          <Search
            size={16}
            color="gray"
          />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="검색어를 입력해주세요"
            className="w-full text-[14px] font-semibold text-black placeholder:text-[#A5A5A5] focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchHeader
