import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import s from './CTA.module.css'

export default function CTA() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()

  const goToContact = () => {
    const fn = (window as unknown as Record<string, (i: number) => void>).__goToSection
    if (fn) fn(9)
  }

  return (
    <section className={s.section} ref={ref}>
      <div className={s.inner}>
        <h2 className={s.title} data-reveal>{t('cta.title')}</h2>
        <p className={s.sub} data-reveal>{t('cta.sub')}</p>
        <button className={s.button} onClick={goToContact} data-reveal>
          {t('cta.button')} →
        </button>

        <div className={s.divider} />

        <h3 className={s.partnerTitle} data-reveal>{t('cta.partnerTitle')}</h3>
        <p className={s.partnerSub} data-reveal>{t('cta.partnerSub')}</p>
        <button className={s.partnerButton} onClick={goToContact} data-reveal>
          {t('cta.partnerButton')} →
        </button>
      </div>
    </section>
  )
}
