'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface KeyboardNavigationProps {
  previousUrl: string | null
  nextUrl: string | null
}

export function KeyboardNavigation({ previousUrl, nextUrl }: KeyboardNavigationProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, or editable element
      const target = e.target as HTMLElement
      const isInput = target.tagName === 'INPUT' || 
                      target.tagName === 'TEXTAREA' || 
                      target.isContentEditable ||
                      target.closest('[contenteditable="true"]')
      
      if (isInput) return

      // Ignore if modifiers are pressed (Shift, Ctrl, Meta, Alt)
      if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return

      // Left arrow: previous page
      if (e.key === 'ArrowLeft' && previousUrl) {
        e.preventDefault()
        router.push(previousUrl)
        return
      }
      
      // Right arrow: next page
      if (e.key === 'ArrowRight' && nextUrl) {
        e.preventDefault()
        router.push(nextUrl)
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previousUrl, nextUrl, router])

  // This component doesn't render anything
  return null
}

