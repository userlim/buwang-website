import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { IconWrench, IconBike, IconCheck } from '../../components/Icons'
import s from './Audience.module.css'

const ICONS: Record<string, ReactNode> = {
  wrench: <IconWrench size={30} />,
  bike: <IconBike size={30} />,
  check: <IconCheck size={30} />,
}

export default function Audience() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>({ type: 'scale', stagger: 0.18 })
  const personas = t('audience.personas', { returnObjects: true }) as Array<{
    icon: string; role: string; desc: string; sub?: string
  }>

  return (
    <section className={s.section} ref={ref}>
      <div className={s.inner}>
        <div className={s.header} data-reveal>
          <span className={s.badge}>{t('audience.badge')}</span>
          <h2 className={s.title}>{t('audience.title')}</h2>
        </div>

        <div className={s.grid}>
          {personas.map((p, i) => (
            <div className={s.card} key={i} data-reveal>
              <div className={s.iconWrap}>{ICONS[p.icon] ?? <IconWrench size={30} />}</div>
              <h3 className={s.role}>{p.role}</h3>
              <p className={s.desc}>{p.desc}</p>
              {p.sub && <p className={s.sub}>{p.sub}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
