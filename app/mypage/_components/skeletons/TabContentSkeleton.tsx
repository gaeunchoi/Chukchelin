import { flexCol, flexRowICenter } from '@/style/custom'

function TabContentSkeleton() {
  return (
    <div
      className={flexCol('w-full', 'h-12', 'items-start', 'gap-6')}
    >
      <div
        className={flexRowICenter(
          'gap-4',
          'text-gray-800',
          'text-[14px]',
          'font-medium',
        )}
      >
        <div className="py-3 box-border border-b-3 border-transparent">
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="py-3 box-border border-b-3 border-transparent">
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="w-full py-8">
        <div className="w-full h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

export default TabContentSkeleton
