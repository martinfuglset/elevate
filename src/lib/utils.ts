import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Smooth scroll to an element by its ID
 * @param id - The ID of the element to scroll to
 * @param offset - Optional offset from the top (default: 80 for header height)
 */
export function smoothScrollTo(id: string, offset: number = 80) {
  const element = document.getElementById(id)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Handle anchor link clicks with smooth scrolling
 * @param href - The href attribute of the link
 * @param e - The click event
 */
export function handleAnchorClick(href: string, e: React.MouseEvent<HTMLAnchorElement>) {
  if (href.startsWith('#')) {
    e.preventDefault()
    const id = href.substring(1)
    smoothScrollTo(id)
  }
} 