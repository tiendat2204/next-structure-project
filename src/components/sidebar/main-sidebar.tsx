'use client'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function MainSidebar () {
  const { getOpenState, setIsHover, settings } = useSidebar()

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        !getOpenState() ? 'w-[103px]' : 'w-72',
        settings.disabled && 'hidden'
      )}
    >
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className='relative h-full flex flex-col px-3 py-4 overflow-y-auto border-r'
      >
        <Link href='/'>
          <Button
            className='transition-transform ease-in-out duration-300 mb-1 mt-0.5'
            variant='link'
          >
            <span className='font-bold text-lg'>Logo</span>
          </Button>
        </Link>
        {/* Add your menu items here */}
      </div>
    </aside>
  )
}
