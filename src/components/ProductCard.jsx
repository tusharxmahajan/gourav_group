import { useId } from 'react';
import { divisions, ui } from '../data/content';
import ResponsiveImage from './ResponsiveImage';
import styles from './ProductCard.module.css';

export default function ProductCard({ card }) {
  const division = divisions[card.division];
  const sectorsId = useId();

  return (
    <article className={styles.card} style={{ '--c': division.color, '--c-text': division.text }} data-reveal-cell>
      <div className={styles.media} data-reveal-media>
        <ResponsiveImage
          src={card.image}
          alt=""
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          className={styles.image}
        />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.bar} aria-hidden="true" />
        <h3 className={styles.title}>{division.name}</h3>
      </div>

      <div className={styles.body}>
        <p className={styles.subtitle}>{card.subtitle}</p>
        <p className={styles.description}>{card.description}</p>
      </div>

      <ul className={styles.links} data-tight={card.sectors ? true : undefined}>
        {card.items.map((item) => (
          <li key={item}>
            <a className={styles.link} href="#">
              <span>{item}</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>

      {card.sectors && (
        <div className={styles.sectorsInset}>
          <div className={styles.sectors}>
            <p id={sectorsId} className={styles.sectorsLabel}>
              {ui.sectors}
            </p>
            <ul className={styles.chips} aria-labelledby={sectorsId}>
              {card.sectors.map((sector) => (
                <li key={sector} className={styles.chip}>
                  {sector}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <a className={styles.cta} href="#">
        <span>
          {ui.explore} {division.name}
        </span>
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
