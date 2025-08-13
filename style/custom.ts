import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'

export const page = (...args: ClassValue[]) =>
  cn(
    'flex',
    'flex-col',
    'items-center',
    'justify-start',
    'min-h-screen-safe',
    'box-border',
    'p-6',
    'pt-0',
    'gap-6',
    'max-w-[450px]',
    'w-full',
    'mx-auto',
    ...args,
  )

export const flexRow = (...args: ClassValue[]) =>
  cn('flex', 'flex-row', 'gap-2', ...args)

export const flexCol = (...args: ClassValue[]) =>
  cn('flex', 'flex-col', 'gap-2', ...args)

export const flexRowICenter = (...args: ClassValue[]) =>
  cn('flex', 'flex-row', 'items-center', 'gap-2', ...args)

export const flexColICenter = (...args: ClassValue[]) =>
  cn('flex', 'flex-col', 'items-center', 'gap-2', ...args)

export const flexRowJCenter = (...args: ClassValue[]) =>
  cn('flex', 'flex-row', 'justify-center', 'gap-2', ...args)

export const flexColJCenter = (...args: ClassValue[]) =>
  cn('flex', 'flex-col', 'justify-center', 'gap-2', ...args)

export const flexRowIJCenter = (...args: ClassValue[]) =>
  cn(
    'flex',
    'flex-row',
    'items-center',
    'justify-center',
    'gap-2',
    ...args,
  )

export const flexColIJCenter = (...args: ClassValue[]) =>
  cn(
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'gap-2',
    ...args,
  )

export const badge = (...args: ClassValue[]) =>
  cn(
    'text-[11px]',
    'font-semibold',
    'rounded-full',
    'px-2',
    'py-0.5',
    'border',
    ...args,
  )

export const header = (...args: ClassValue[]) =>
  cn(
    'w-full',
    'min-h-[62px]',
    'flex',
    'flex-row',
    'items-center',
    'gap-2',
    ...args,
  )

export const stickyButton = (...args: ClassValue[]) =>
  cn(
    'sticky',
    'bottom-4',
    'w-full',
    'p-6',
    'z-10',
    'font-semibold',
    ...args,
  )
