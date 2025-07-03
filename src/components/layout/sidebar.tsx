'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  MoreHorizontal,
  Settings,
  HelpCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  CircleDot,
} from 'lucide-react'
import { useSidebar } from '@/lib/sidebar-context'
import { mainNavItems } from '@/lib/navigation'

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, toggleSidebar, isLoading } = useSidebar()

  // Don't render until we've loaded the initial state to prevent layout shift
  if (isLoading) {
    return (
      <div className="hidden border-r bg-muted/40 md:flex md:flex-col md:w-64">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2">
            <CircleDot className="h-5 w-5" />
            Elevate
          </div>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
            {mainNavItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground animate-pulse"
              >
                <div className="h-4 w-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded flex-1" />
              </div>
            ))}
          </nav>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          "hidden border-r bg-muted/40 md:flex md:flex-col transition-all duration-300 ease-in-out shrink-0",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className={cn(
          "flex h-14 items-center border-b transition-all duration-300 lg:h-[60px]", 
          isCollapsed ? "justify-center px-2" : "px-4 lg:px-6"
        )}>
          <Link href="/" className={cn(
            "flex items-center gap-2 transition-all duration-300 overflow-hidden",
            isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
          )}>
            <CircleDot className="h-5 w-5 shrink-0" />
            <span>
              Elevate
            </span>
          </Link>
          <div className={cn(
            "transition-all duration-300",
            isCollapsed ? "ml-0" : "ml-auto"
          )}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="h-8 w-8 hover:bg-accent transition-all duration-200"
                  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  <ChevronLeft className={cn(
                    "h-4 w-4 transition-all duration-300",
                    isCollapsed && "rotate-180"
                  )} />
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  Expand
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className={cn(
            "grid items-start gap-2 text-sm font-medium",
            isCollapsed ? "px-2" : "px-2 lg:px-4"
          )}>
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href
              const linkContent = (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg py-3 text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-primary",
                    isActive && "bg-muted text-primary shadow-sm",
                    isCollapsed ? "justify-center px-3" : "px-4 gap-3"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 transition-all duration-200",
                    isActive && "text-primary"
                  )} />
                  <span className={cn(
                    "transition-all duration-300 overflow-hidden",
                    isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  )}>
                    {item.name}
                  </span>
                </Link>
              )

              if (isCollapsed) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      {linkContent}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return linkContent
            })}
          </nav>
        </div>
        
        <div className={cn(
          "mt-auto border-t transition-all duration-300", 
          isCollapsed ? "p-2" : "p-4"
        )}>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full p-2 hover:bg-accent transition-all duration-200",
                      isCollapsed ? "justify-center gap-0" : "justify-start gap-4"
                    )}
                  >
                    <Avatar className="h-9 w-9 transition-all duration-200">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className={cn(
                      "flex flex-col items-start transition-all duration-300 overflow-hidden",
                      isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                    )}>
                      <p className="text-sm font-medium">User</p>
                      <p className="text-xs text-muted-foreground">contact@example.com</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  User
                </TooltipContent>
              )}
            </Tooltip>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  )
} 