import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { IconMonitor, IconScan, IconShield, IconFile } from '../../components/Icons'
import s from './Features.module.css'

const ICONS: Record<string, ReactNode> = {
  monitor: <IconMonitor size={30} />,
  scan: <IconScan size={30} />,
  shield: <IconShield size={30} />,
  file: <IconFile size={30} />,
}

export default function Features() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>({ type: 'scale', stagger: 0.15 })
  const items = t('features.items', { returnObjects: true }) as Array<{
    icon: string; title: string; desc: string
  }>

  return (
    <section className={s.section} id="features" ref={ref}>
      <div className={s.inner}>
        <div className={s.header} data-reveal>
          <span className={s.badge}>{t('features.badge')}</span>
          <h2 className={s.title}>{t('features.title')}</h2>
        </div>

        <div className={s.grid}>
          {items.map((item, i) => (
            <div className={s.card} key={i} data-reveal>
              <div className={s.iconWrap}>
                {ICONS[item.icon] ?? <IconMonitor size={30} />}
              </div>
              <h3 className={s.cardTitle}>{item.title}</h3>
              <p className={s.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
