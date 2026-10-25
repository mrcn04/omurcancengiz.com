'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Fades in every [data-animate] element as it scrolls into view, on every page.
export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    )
    const observe = () =>
      document
        .querySelectorAll('[data-animate]:not(.animate-in)')
        .forEach(el => observer.observe(el))

    observe()
    const mutations = new MutationObserver(observe)
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [pathname])

  return null
}
