'use client'
import * as React from 'react'
import { SIDEBAR_COOKIE_NAME, useSidebar } from '@/hooks/use-sidebar'

export function SidebarProvider ({ children }: { children: React.ReactNode }) {
  // Read document.cookie synchronously before first render (client only).
  // document.cookie is synchronous — unlike cookies() it doesn't block the route.
  // On the server this is skipped → Zustand keeps its default (isOpen: true).
  // The existing CSS transition-[margin-left/width] duration-300 handles any
  // server→client difference smoothly for users who had the sidebar closed.
  React.useState(() => {
    if (typeof document === 'undefined') return

    const match = document.cookie.match(
      new RegExp(`${SIDEBAR_COOKIE_NAME}=(true|false)`)
    )

    if (match) {
      useSidebar.setState({ isOpen: match[1] === 'true' })
    }
  })

  return <>{children}</>
}
