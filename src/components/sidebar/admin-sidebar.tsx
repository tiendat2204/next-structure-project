'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar
} from '@/components/sidebar/sidebar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AdminSidebar () {
  const { open } = useSidebar()

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <Link href='/'>
          <Button
            className='transition-transform ease-in-out duration-300 mb-1 mt-0.5 w-full'
            variant='link'
          >
            <span className='font-bold text-lg'>Logo</span>
          </Button>
        </Link>
      </SidebarHeader>
      <SidebarContent className='scrollbar-hide'>
        {/* Add your menu items here */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
