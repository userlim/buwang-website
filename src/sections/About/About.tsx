import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import s from './About.module.css'

export default function About() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>({ type: 'blur', stagger: 0.15 })
  const values = t('about.values', { returnObjects: true }) as Array<{
    label: string; highlight: string; suffix: string
  }>

  return (
    <section className={s.section} id="about" ref={ref}>
      <div className={s.inner}>
        <span className={s.badge} data-reveal>{t('about.badge')}</span>
        <h2 className={s.title} data-reveal>{t('about.title')}</h2>

        <div className={s.values}>
          {values.map((v, i) => (
            <p className={s.value} key={i} data-reveal>
              {v.label}{' '}
              <span className={s.valueHighlight}>{v.highlight}</span>
              {v.suffix}
            </p>
          ))}
        </div>

        <div className={s.market} data-reveal>
          <p className={s.marketTitle}>{t('about.marketTitle')}</p>
          <p className={s.marketSub}>{t('about.marketSub')}</p>
        </div>
      </div>
    </section>
  )
}
