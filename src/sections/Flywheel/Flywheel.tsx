import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { IconStore, IconClipboard, IconHandshake, IconTrendUp } from '../../components/Icons'
import s from './Flywheel.module.css'

const ICONS: ReactNode[] = [
  <IconStore size={24} key="0" />,
  <IconClipboard size={24} key="1" />,
  <IconHandshake size={24} key="2" />,
  <IconTrendUp size={24} key="3" />,
]

const ANGLES = [-90, 0, 90, 180] // 12시, 3시, 6시, 9시

export default function Flywheel() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>({ type: 'fade-up', stagger: 0.12 })
  const steps = t('flywheel.steps', { returnObjects: true }) as string[]

  const size = 480
  const radius = 180
  const cx = size / 2
  const cy = size / 2

  return (
    <section className={s.section} ref={ref}>
      <div className={s.inner}>
        <h2 className={s.title} data-reveal>{t('flywheel.title')}</h2>

        <div className={s.wheel} style={{ width: size, height: size }} data-reveal>
          {/* SVG 화살표 */}
          <svg className={s.svg} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <marker id="ah" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5" fill="#00a3ff" opacity="0.4" />
              </marker>
            </defs>
            <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(0,163,255,0.07)" strokeWidth="1" />
            {ANGLES.map((_, i) => {
              const a1 = (ANGLES[i] + 20) * Math.PI / 180
              const a2 = (ANGLES[(i + 1) % 4] - 20 + (i === 3 ? 360 : 0)) * Math.PI / 180
              const amid = ((ANGLES[i] + 20 + ANGLES[(i + 1) % 4] - 20 + (i === 3 ? 360 : 0)) / 2) * Math.PI / 180
              return (
                <path
                  key={i}
                  d={`M${cx + Math.cos(a1) * radius},${cy + Math.sin(a1) * radius} Q${cx + Math.cos(amid) * (radius + 28)},${cy + Math.sin(amid) * (radius + 28)} ${cx + Math.cos(a2) * radius},${cy + Math.sin(a2) * radius}`}
                  fill="none" stroke="#00a3ff" strokeWidth="1.5" opacity="0.2" markerEnd="url(#ah)"
                />
              )
            })}
          </svg>

          {/* 중앙 */}
          <div className={s.center}>
            <span className={s.loopIcon}>∞</span>
          </div>

          {/* 카드 4개 */}
          {steps.map((step, i) => {
            const rad = ANGLES[i] * Math.PI / 180
            const x = cx + Math.cos(rad) * radius
            const y = cy + Math.sin(rad) * radius
            return (
              <div className={s.card} key={i} style={{ left: x, top: y }}>
                <div className={s.iconWrap}>{ICONS[i]}</div>
                <div className={s.cardText}>
                  <span className={s.num}>0{i + 1}</span>
                  <span className={s.label}>{step}</span>
                </div>
              </div>
            )
          })}
        </div>

        <p className={s.subtitle} data-reveal>
          <span className={s.highlight}>{t('flywheel.subtitleData')}</span>이 쌓일수록,{' '}
          <span className={s.highlight}>{t('flywheel.subtitleValue')}</span>이 늘어납니다
        </p>
      </div>
    </section>
  )
}
