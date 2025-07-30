'use client'

import { useEffect } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { SidebarProvider, useSidebar } from '@/lib/sidebar-context'
import { cn } from '@/lib/utils'

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col overflow-hidden flex-1 min-w-0 bg-background">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300 bg-background">
          <div className="space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Add class to body when dashboard layout mounts
    document.body.classList.add('dashboard-active')
    console.log('Dashboard active class added')
    
    // Remove class when component unmounts
    return () => {
      document.body.classList.remove('dashboard-active')
      console.log('Dashboard active class removed')
    }
  }, [])

  return (
    <SidebarProvider>
      <DashboardLayoutContent>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  )
} 