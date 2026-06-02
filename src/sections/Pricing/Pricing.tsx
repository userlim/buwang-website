import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import s from './Pricing.module.css'

export default function Pricing() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>({ type: 'fade-right', stagger: 0.2 })
  const tiers = t('pricing.tiers', { returnObjects: true }) as Array<{
    name: string; price: string; desc: string; tag: string; note?: string
  }>

  return (
    <section className={s.section} ref={ref}>
      <div className={s.inner}>
        <div className={s.header} data-reveal>
          <span className={s.badge}>{t('pricing.badge')}</span>
          <h2 className={s.title}>{t('pricing.title')}</h2>
        </div>

        <div className={s.grid}>
          {tiers.map((tier, i) => (
            <div className={`${s.card} ${i === 0 ? s.cardFeatured : ''}`} key={i} data-reveal>
              <span className={s.tag}>{tier.tag}</span>
              <h3 className={s.cardName}>{tier.name}</h3>
              <div className={s.cardPrice}>{tier.price}</div>
              <p className={s.cardDesc}>{tier.desc}</p>
              {tier.note && <p className={s.cardDesc} style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.5rem' }}>{tier.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
