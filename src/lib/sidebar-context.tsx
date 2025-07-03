'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  isLoading: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('sidebar-collapsed')
      if (savedState !== null) {
        setIsCollapsed(JSON.parse(savedState))
      }
    } catch (error) {
      console.warn('Failed to load sidebar state from localStorage:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed))
      } catch (error) {
        console.warn('Failed to save sidebar state to localStorage:', error)
      }
    }
  }, [isCollapsed, isLoaded])

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  const setCollapsed = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed)
  }, [])

  return (
    <SidebarContext.Provider value={{ 
      isCollapsed, 
      setIsCollapsed: setCollapsed, 
      toggleSidebar,
      isLoading: !isLoaded
    }}>
      {children}
    </SidebarContext.Provider>
  )
} 