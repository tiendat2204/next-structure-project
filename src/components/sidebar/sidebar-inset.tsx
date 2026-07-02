'use client'
import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'

interface SidebarInsetProps {
  children: React.ReactNode
}

export function SidebarInset ({ children }: SidebarInsetProps) {
  const { getOpenState, settings } = useSidebar()

  return (
    <>
      <main
        className={cn(
          'min-h-[calc(100vh-56px)] bg-zinc-50 transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[103px]' : 'lg:ml-72')
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
        )}
      >
        {/* <Footer /> */}
      </footer>
    </>
  )
}
