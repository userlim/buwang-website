import { useTranslation } from 'react-i18next'
import { useCountUp } from '../../hooks/useCountUp'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import s from './Stats.module.css'

function StatCard({ value, unit, suffix, label, sub }: {
  value: string; unit: string; suffix: string; label: string; sub?: string
}) {
  const numericValue = parseInt(value.replace(/,/g, ''), 10)
  const { count, ref } = useCountUp(numericValue, 2000)

  const displayValue = numericValue >= 1000
    ? count.toLocaleString()
    : count.toString()

  return (
    <div className={s.card} ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={s.number}>
        {displayValue}
        {unit && <span className={s.unit}>{unit}</span>}
        <span className={s.suffix}>{suffix}</span>
      </div>
      <p className={s.label}>{label}</p>
      {sub && <p className={s.sub}>{sub}</p>}
    </div>
  )
}

export default function Stats() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()
  const items = t('stats.items', { returnObjects: true }) as Array<{
    value: string; unit: string; suffix: string; label: string; sub?: string
  }>

  return (
    <section className={s.section} ref={ref}>
      <div className={s.inner}>
        <div className={s.header} data-reveal>
          <span className={s.badge}>{t('stats.badge')}</span>
          <h2 className={s.sectionTitle}>{t('stats.title')}</h2>
        </div>
        <div className={s.grid}>
          {items.map((item, i) => (
            <StatCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
