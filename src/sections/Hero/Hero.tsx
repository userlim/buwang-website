import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import s from './Hero.module.css'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  const { t } = useTranslation()
  const contentRef = useRef<HTMLDivElement>(null)
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isMobile && !prefersReduced) setShowScene(true)
  }, [])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelector(`.${s.sub}`)?.setAttribute('style', 'opacity:1')
      el.querySelector(`.${s.cta}`)?.setAttribute('style', 'opacity:1')
      return
    }

    const tl = gsap.timeline({ delay: 0.5 })

    // Headline: split into lines with clip reveal
    tl.from(el.querySelector(`.${s.headline}`), {
      opacity: 0,
      y: 60,
      filter: 'blur(8px)',
      duration: 1.2,
      ease: 'power4.out',
    })

    // Accent text: gradient sweep
    tl.from(el.querySelector(`.${s.accent}`), {
      opacity: 0,
      x: -20,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')

    // Sub text: fade up with blur
    tl.to(el.querySelector(`.${s.sub}`), {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.4')

    // CTA: scale bounce in
    tl.to(el.querySelector(`.${s.cta}`), {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.5)',
    }, '-=0.3')

    // Scroll hint fade in
    tl.from(el.closest('section')?.querySelector(`.${s.scrollHint}`) ?? {}, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2')
  }, [])

  const goTo = (i: number) => {
    const fn = (window as unknown as Record<string, (i: number) => void>).__goToSection
    if (fn) fn(i)
  }

  return (
    <section className={s.hero} id="hero">
      <div className={s.fallback} />
      {showScene && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      <div className={s.content} ref={contentRef}>
        <h1 className={s.headline}>
          {t('hero.headline')}{' '}
          <span className={s.accent}>{t('hero.headlineAccent')}</span>
        </h1>
        <p className={s.sub}>{t('hero.sub')}</p>
        <button className={s.cta} onClick={() => goTo(9)}>
          {t('hero.cta')}
          <span className={s.ctaArrow}>↓</span>
        </button>
      </div>

      <button className={s.scrollHint} onClick={() => goTo(1)} aria-label="다음 섹션으로 스크롤">
        <span className={s.scrollText}>scroll</span>
        <div className={s.scrollLine} />
      </button>
    </section>
  )
}
