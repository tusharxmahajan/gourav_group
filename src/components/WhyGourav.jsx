import { why } from '../data/content';
import GridGuides from './GridGuides';
import Rule from './Rule';
import styles from './WhyGourav.module.css';

const twoDigits = (n) => String(n).padStart(2, '0');

export default function WhyGourav() {
  const { feature, points } = why;

  return (
    <section className={styles.section} aria-labelledby="why-title">
      <GridGuides tone="dark" />
      <div className={styles.content}>
        <div className={styles.header} data-reveal>
          <h2 id="why-title" className={styles.title}>
            {why.title}
          </h2>
        </div>
        <Rule variant="dark" />

        <div className={styles.bento}>
          <div className={styles.feature} data-reveal-cell>
            <div className={styles.hatch} aria-hidden="true" />
            <div className={styles.featureBody}>
              <p className={styles.featureLabel}>{feature.label}</p>
              <div className={styles.featureStat}>
                <p className={styles.stat}>
                  {feature.value}
                  <span className={styles.unit}>{` ${feature.unit}`}</span>
                </p>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            </div>
          </div>

          {points.map((point, i) => (
            <div key={point.title} className={styles.point} data-reveal-cell>
              <span className={styles.pointNumber} aria-hidden="true">
                {twoDigits(i + 1)}
              </span>
              <div className={styles.pointBody}>
                <h3 className={styles.pointTitle}>{point.title}</h3>
                <p className={styles.pointText}>{point.text}</p>
              </div>
            </div>
          ))}
        </div>

        <Rule variant="dark" />
      </div>
    </section>
  );
}
