import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import s from './Nav.module.css'

const SECTION_MAP: Record<string, number> = {
  hero: 0, about: 1, stats: 2, features: 3, process: 4,
  audience: 5, flywheel: 6, pricing: 7, cta: 8, contact: 9,
}

function goToSection(index: number) {
  const goTo = (window as unknown as Record<string, (i: number) => void>).__goToSection
  if (goTo) goTo(index)
}

export default function Nav() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = (id: string) => {
    setMenuOpen(false)
    goToSection(SECTION_MAP[id] ?? 0)
  }

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ko' ? 'en' : 'ko')
  }

  const isKo = i18n.language === 'ko'

  return (
    <>
      <nav className={`${s.nav} ${s.blur}`} role="navigation" aria-label="Main navigation">
        <button className={s.logo} onClick={() => navigate('hero')}>
          <img src="/buwang-logo.svg" alt="" className={s.logoIcon} />
          BUWANG
        </button>

        <div className={s.links}>
          <button className={s.link} onClick={() => navigate('about')}>{t('nav.about')}</button>
          <button className={s.link} onClick={() => navigate('features')}>{t('nav.why')}</button>
          <button className={s.link} onClick={() => navigate('contact')}>{t('nav.contact')}</button>
        </div>

        <div className={s.right}>
          <button className={s.langToggle} onClick={toggleLang} aria-label="Switch language">
            <span className={isKo ? s.langActive : ''}>KR</span>
            <span className={s.langDivider}>|</span>
            <span className={!isKo ? s.langActive : ''}>EN</span>
          </button>

          <button className={s.ctaButton} onClick={() => navigate('contact')}>
            {t('nav.cta')}
          </button>

          <button
            className={`${s.hamburger} ${menuOpen ? s.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={s.hamburgerLine} />
            <span className={s.hamburgerLine} />
            <span className={s.hamburgerLine} />
          </button>
        </div>
      </nav>

      <div className={`${s.overlay} ${menuOpen ? s.overlayOpen : ''}`}>
        <button className={s.overlayLink} onClick={() => navigate('about')}>{t('nav.about')}</button>
        <button className={s.overlayLink} onClick={() => navigate('features')}>{t('nav.why')}</button>
        <button className={s.overlayLink} onClick={() => navigate('contact')}>{t('nav.contact')}</button>
      </div>
    </>
  )
}
