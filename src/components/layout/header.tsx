'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import {
  Menu,
  LayoutGrid
} from 'lucide-react'

import { CustomButton } from '@/components/ui/custom-button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { mainNavItems, allPages } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/lib/sidebar-context'

export function Header({ className }: { className?: string }) {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()
  
  const currentPage = allPages.find((item) => item.href === pathname)
  const pageName = currentPage?.name || 'Dashboard'
  const PageIcon = currentPage?.icon || LayoutGrid

  // Keyboard shortcut for toggling sidebar (Ctrl/Cmd + B)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault()
        toggleSidebar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  return (
    <header className={cn("flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6", className)}>
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <CustomButton
            size="default"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </CustomButton>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-medium"
            >
              <span className="text-lg font-medium text-gray-900">ELEVATE</span>
            </Link>
            {mainNavItems.map((item) => (
               <Link
                key={item.name}
                href={item.href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="w-full flex-1">
        <h1 className="text-lg font-medium flex items-center gap-2">
          <PageIcon className="h-5 w-5" />
          {pageName}
        </h1>
      </div>
    </header>
  )
} 