import {
  LayoutGrid,
  Users,
  Settings,
  HelpCircle,
  ClipboardList,
  BookOpen,
} from 'lucide-react'

export interface PageConfig {
  name: string
  href: string
  icon: any
  inMainNav?: boolean
}

export const pages: PageConfig[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
    inMainNav: true,
  },
  {
    name: 'Program Library',
    href: '/program-library',
    icon: BookOpen,
    inMainNav: true,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    inMainNav: false,
  },
  {
    name: 'Help & Support',
    href: '/help',
    icon: HelpCircle,
    inMainNav: false,
  },
]

export const mainNavItems = pages.filter(page => page.inMainNav)
export const allPages = pages 