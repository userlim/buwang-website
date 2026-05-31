import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import s from './Contact.module.css'

export default function Contact() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLElement>()
  const [submitted, setSubmitted] = useState(false)
  const types = t('contact.fields.types', { returnObjects: true }) as string[]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className={s.section} id="contact" ref={ref}>
      <div className={s.inner}>
        <h2 className={s.title} data-reveal>{t('contact.title')}</h2>

        {submitted ? (
          <div className={s.success}>
            <div className={s.successIcon}>✓</div>
            <p className={s.successText}>{t('contact.success')}</p>
          </div>
        ) : (
          <form className={s.form} onSubmit={handleSubmit} data-reveal>
            <div className={s.row}>
              <div className={s.field}>
                <label className={s.label}>{t('contact.fields.name')}</label>
                <input className={s.input} type="text" required />
              </div>
              <div className={s.field}>
                <label className={s.label}>{t('contact.fields.email')}</label>
                <input className={s.input} type="email" required />
              </div>
            </div>

            <div className={s.row}>
              <div className={s.field}>
                <label className={s.label}>{t('contact.fields.phone')}</label>
                <input className={s.input} type="tel" />
              </div>
              <div className={s.field}>
                <label className={s.label}>{t('contact.fields.company')}</label>
                <input className={s.input} type="text" />
                <span className={s.hint}>{t('contact.fields.companyHint')}</span>
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label}>{t('contact.fields.type')}</label>
              <select className={s.select} required defaultValue="">
                <option value="" disabled>선택해주세요</option>
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className={s.field}>
              <label className={s.label}>{t('contact.fields.message')}</label>
              <textarea className={s.textarea} required />
            </div>

            <button className={s.submit} type="submit">
              {t('contact.fields.submit')}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
