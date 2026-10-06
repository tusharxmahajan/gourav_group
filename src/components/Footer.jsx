import { Fragment } from 'react';
import { anchors, contact, divisions, footer } from '../data/content';
import GridGuides from './GridGuides';
import Rule from './Rule';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id={anchors.contact} className={styles.footer}>
      <GridGuides tone="dark" />
      <div className={styles.content}>
        <div className={styles.cta} data-reveal>
          <h2 className={styles.title}>
            {footer.title.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h2>
          <div className={styles.actions}>
            <a className={styles.outline} href={contact.whatsapp.href}>
              {contact.whatsapp.label}
            </a>
            <a className={styles.outline} href={contact.phone.href}>
              {contact.phone.label}
            </a>
            <a className={styles.solid} href="#">
              {footer.enquiry}
            </a>
          </div>
        </div>

        <Rule variant="dark" />

        <div className={styles.offices}>
          {footer.offices.map((office) => (
            <div key={office.name} className={styles.office} data-reveal-cell>
              <h3 className={styles.officeName}>
                <span
                  className={styles.swatch}
                  style={{ background: divisions[office.division].color }}
                  aria-hidden="true"
                />
                {office.name}
              </h3>
              <address className={styles.lines}>
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
          ))}
        </div>

        <Rule variant="dark" />

        <div className={styles.bottom} data-reveal>
          <p>{footer.copyright}</p>
          <ul className={styles.social}>
            {footer.social.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
