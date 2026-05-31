import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

export function useFullPageScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef(0)
  const isAnimating = useRef(false)
  const totalRef = useRef(0)
  const wheelAccum = useRef(0)
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= totalRef.current) return
    if (index === currentRef.current) return
    if (isAnimating.current) return

    isAnimating.current = true
    currentRef.current = index

    gsap.to(containerRef.current, {
      y: -index * window.innerHeight,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        isAnimating.current = false
      },
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sections = Array.from(container.children) as HTMLElement[]
    totalRef.current = sections.length

    const resize = () => {
      sections.forEach((s) => {
        s.style.height = `${window.innerHeight}px`
        s.style.overflow = 'hidden'
      })
      gsap.set(container, { y: -currentRef.current * window.innerHeight })
    }
    resize()
    window.addEventListener('resize', resize)

    // Wheel: accumulate delta, debounce, then decide direction
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isAnimating.current) return

      wheelAccum.current += e.deltaY

      if (wheelTimer.current) clearTimeout(wheelTimer.current)
      wheelTimer.current = setTimeout(() => {
        wheelAccum.current = 0
      }, 200)

      // Threshold: only trigger once per scroll gesture
      if (Math.abs(wheelAccum.current) > 50) {
        const dir = wheelAccum.current > 0 ? 1 : -1
        wheelAccum.current = 0
        goTo(currentRef.current + dir)
      }
    }

    // Touch
    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return
      const diff = touchStartY - e.changedTouches[0].clientY
      if (diff > 50) goTo(currentRef.current + 1)
      else if (diff < -50) goTo(currentRef.current - 1)
    }

    // Keyboard
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault(); goTo(currentRef.current + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault(); goTo(currentRef.current - 1)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [goTo])

  return { containerRef, goTo }
}
