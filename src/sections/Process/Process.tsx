import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import s from './Process.module.css'

export default function Process() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>({ type: 'fade-left', stagger: 0.2 })
  const steps = t('process.steps', { returnObjects: true }) as Array<{
    num: string; title: string; desc: string
  }>

  return (
    <section className={s.section} ref={ref}>
      <div className={s.inner}>
        <div className={s.header} data-reveal>
          <span className={s.badge}>{t('process.badge')}</span>
          <h2 className={s.title}>{t('process.title')}</h2>
        </div>

        <div className={s.steps}>
          {steps.map((step, i) => (
            <div className={s.step} key={i} data-reveal>
              <div className={s.stepNum}>{step.num}</div>
              <div>
                <div className={s.stepDot} />
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
