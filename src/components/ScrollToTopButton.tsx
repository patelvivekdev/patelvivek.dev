'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    // listen for scroll events
    window.addEventListener('scroll', toggleVisibility)

    // clear the listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    if (isVisible) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      })
    }
  }

  return (
    <button
      aria-label='Scroll to top'
      className={`fixed bottom-20 right-4 rounded-full bg-neutral-400 p-2 outline-none transition-opacity duration-200 dark:bg-neutral-700 md:right-10 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <ChevronUp className='h-6 w-6' />
    </button>
  )
}

export default ScrollToTopButton
