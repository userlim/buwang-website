import { useTranslation } from 'react-i18next'
import s from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()
  const productLinks = t('footer.productLinks', { returnObjects: true }) as string[]
  const supportLinks = t('footer.supportLinks', { returnObjects: true }) as string[]
  const legalLinks = t('footer.legalLinks', { returnObjects: true }) as string[]

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.brand}>
            <div className={s.logo}>
              <img src="/buwang-logo.svg" alt="" className={s.logoIcon} />
              BUWANG
            </div>
            <p className={s.brandDesc}>
              정비소 운영부터 라이더 이력 관리까지, 이륜차 정비의 모든 것
            </p>
          </div>

          <div className={s.column}>
            <h4>{t('footer.product')}</h4>
            {productLinks.map((link) => (
              <a href="#" key={link}>{link}</a>
            ))}
          </div>

          <div className={s.column}>
            <h4>{t('footer.support')}</h4>
            {supportLinks.map((link) => (
              <a href="#" key={link}>{link}</a>
            ))}
          </div>

          <div className={s.column}>
            <h4>{t('footer.legal')}</h4>
            {legalLinks.map((link) => (
              <a href="#" key={link}>{link}</a>
            ))}
          </div>
        </div>

        <div className={s.bottom}>
          <span className={s.copyright}>{t('footer.copyright')}</span>
          <div className={s.bottomLinks}>
            {legalLinks.map((link) => (
              <a href="#" key={link}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
