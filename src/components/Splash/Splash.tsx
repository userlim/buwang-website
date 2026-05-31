import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import s from './Splash.module.css'

interface Props {
  onComplete: () => void
}

export default function Splash({ onComplete }: Props) {
  const splashRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const splash = splashRef.current
    const logo = logoRef.current
    const text = textRef.current
    if (!splash || !logo || !text) {
      onComplete()
      return
    }

    const done = () => {
      splash.style.display = 'none'
      onComplete()
    }

    const tl = gsap.timeline({ onComplete: done })

    // Initial states
    gsap.set(logo, { x: -window.innerWidth * 0.5, opacity: 0, scale: 0.8 })
    gsap.set(text, { opacity: 0, scale: 0.9 })

    // 1. Logo slides in from left to center
    tl.to(logo, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
    }, 0.3)

    // 2. Pause at center — gentle pulse
    tl.to(logo, {
      scale: 1.12,
      duration: 0.5,
      ease: 'power2.inOut',
    })
    tl.to(logo, {
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    })

    // 3. Logo exits to the right
    tl.to(logo, {
      x: window.innerWidth * 0.5,
      opacity: 0,
      scale: 0.85,
      duration: 0.8,
      ease: 'power3.in',
    }, '+=0.2')

    // 4. "BUWANG" gradient text appears as logo leaves
    tl.fromTo(text,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.5'
    )

    // 5. Text holds, then fades out with blur
    tl.to(text, {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(10px)',
      duration: 0.7,
      ease: 'power2.in',
    }, '+=0.5')

    // 6. Splash fades away
    tl.to(splash, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3')

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div className={s.splash} ref={splashRef}>
      <div className={s.logoWrap}>
        <img
          ref={logoRef}
          src="/buwang-logo.svg"
          alt="BUWANG"
          className={s.logo}
        />
        <span ref={textRef} className={s.text}>
          BUWANG
        </span>
      </div>
    </div>
  )
}
