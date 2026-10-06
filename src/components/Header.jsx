import { useEffect, useRef, useState } from 'react';
import { contact, divisions, nav, ui } from '../data/content';
import { MenuIcon, WhatsAppIcon } from './icons';
import styles from './Header.module.css';

const links = nav.map((label) => ({ label, href: `#${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` }));
const MENU_ID = 'site-menu';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      menuButton.current?.focus();
    };
    // The panel only exists below 1024px; close it if the window grows past that.
    const wide = window.matchMedia('(min-width: 1024px)');
    const onWide = (e) => e.matches && setOpen(false);
    document.addEventListener('keydown', onKeyDown);
    wide.addEventListener('change', onWide);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.header} data-pinned>
      <div className={styles.bar} data-intro="header">
        <div className={styles.brand}>
          <a className={styles.logo} href="/" aria-label={ui.home}>
            <span className={styles.bars} aria-hidden="true">
              {Object.values(divisions).map((d) => (
                <span key={d.name} style={{ background: d.color }} />
              ))}
            </span>
            <span className={styles.wordmark}>{ui.brand}</span>
          </a>
        </div>

        <nav className={styles.nav} aria-label={ui.primaryNav}>
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.label}>
                <a className={styles.navLink} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a className={styles.iconButton} href={contact.whatsapp.href} aria-label={ui.whatsapp}>
            <WhatsAppIcon />
          </a>
          <a className={styles.quote} href={ui.quote.href}>
            {ui.quote.label}
          </a>
          <button
            ref={menuButton}
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? ui.menuClose : ui.menuOpen}
            onClick={() => setOpen((o) => !o)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <nav id={MENU_ID} className={styles.panel} aria-label={ui.mobileNav} hidden={!open}>
        <ul className={styles.panelList}>
          {links.map((link) => (
            <li key={link.label}>
              <a className={styles.panelLink} href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.panelFoot}>
          <a className={`${styles.quote} ${styles.panelQuote}`} href={ui.quote.href} onClick={close}>
            {ui.quote.label}
          </a>
        </div>
      </nav>
    </header>
  );
}
