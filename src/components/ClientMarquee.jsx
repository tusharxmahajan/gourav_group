import { clients, ui } from '../data/content';
import ResponsiveImage from './ResponsiveImage';
import Rule from './Rule';
import styles from './ClientMarquee.module.css';

function LogoList({ duplicate = false }) {
  return (
    <ul className={styles.list} aria-hidden={duplicate || undefined} data-duplicate={duplicate || undefined}>
      {clients.map((client) => (
        <li key={client.src}>
          <ResponsiveImage
            src={client.src}
            alt={duplicate ? '' : client.name}
            className={styles.logo}
            style={{ '--h': `${client.h}px` }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function ClientMarquee() {
  return (
    <section className={styles.band} aria-label={ui.clients}>
      <div className={styles.frame} data-reveal>
        <div className={styles.viewport}>
          {/* The list is rendered twice so the loop is seamless. */}
          <div className={styles.track}>
            <LogoList />
            <LogoList duplicate />
          </div>
        </div>
      </div>
      <Rule />
    </section>
  );
}
