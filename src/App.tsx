import { useCallback, useState } from 'react'
import Splash from './components/Splash/Splash'
import Nav from './components/Nav/Nav'
import Hero from './sections/Hero/Hero'
import About from './sections/About/About'
import Stats from './sections/Stats/Stats'
import Features from './sections/Features/Features'
import Process from './sections/Process/Process'
import Audience from './sections/Audience/Audience'
import Flywheel from './sections/Flywheel/Flywheel'
import Pricing from './sections/Pricing/Pricing'
import CTA from './sections/CTA/CTA'
import Contact from './sections/Contact/Contact'
import Footer from './components/Footer/Footer'
import { useFullPageScroll } from './hooks/useFullPageScroll'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const { containerRef, goTo } = useFullPageScroll()

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true)
  }, [])

  // Pass goTo to Nav for anchor navigation
  ;(window as unknown as Record<string, (i: number) => void>).__goToSection = goTo

  return (
    <>
      {!splashDone && <Splash onComplete={handleSplashComplete} />}
      <a href="#main-content" className="skip-nav">본문 바로가기</a>
      <Nav />
      <div ref={containerRef} id="main-content" style={{ willChange: 'transform' }}>
        <section><Hero /></section>
        <section><About /></section>
        <section><Stats /></section>
        <section><Features /></section>
        <section><Process /></section>
        <section><Audience /></section>
        <section><Flywheel /></section>
        <section><Pricing /></section>
        <section><CTA /></section>
        <section><Contact /></section>
        <section><Footer /></section>
      </div>
    </>
  )
}
