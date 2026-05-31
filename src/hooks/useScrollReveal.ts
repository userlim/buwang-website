import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type RevealType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'blur'

export function useScrollReveal<T extends HTMLElement>(
  options?: {
    delay?: number
    y?: number
    stagger?: number
    type?: RevealType
    duration?: number
  }
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const children = el.querySelectorAll('[data-reveal]')
    const targets = children.length > 0 ? Array.from(children) : [el]
    const type = options?.type ?? 'fade-up'

    const fromVars: gsap.TweenVars = { opacity: 0, duration: options?.duration ?? 0.9 }

    switch (type) {
      case 'fade-up':
        fromVars.y = options?.y ?? 50
        break
      case 'fade-left':
        fromVars.x = 60
        break
      case 'fade-right':
        fromVars.x = -60
        break
      case 'scale':
        fromVars.scale = 0.9
        fromVars.y = 30
        break
      case 'blur':
        fromVars.filter = 'blur(8px)'
        fromVars.y = 30
        break
    }

    gsap.set(targets, fromVars)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: options?.duration ?? 0.9,
            delay: options?.delay ?? 0,
            stagger: options?.stagger ?? 0.12,
            ease: 'power3.out',
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.delay, options?.y, options?.stagger, options?.type, options?.duration])

  return ref
}
