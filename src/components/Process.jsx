import { Fragment } from 'react';
import { divisions, process } from '../data/content';
import Rule from './Rule';
import styles from './Process.module.css';

const barColors = (division) => (division === 'all' ? Object.values(divisions) : [divisions[division]]);

export default function Process() {
  return (
    <section className={styles.section} aria-labelledby="process-title">
      <div className={styles.header} data-reveal>
        <h2 id="process-title" className={styles.title}>
          {process.title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h2>
        <p className={styles.intro}>{process.intro}</p>
      </div>
      <Rule />
      <ol className={styles.steps}>
        {process.steps.map((step) => (
          <li key={step.label} className={styles.step} data-dark={step.dark || undefined} data-reveal-cell>
            <span className={styles.label}>{step.label}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <div className={styles.bar} aria-hidden="true" data-reveal-bar>
              {barColors(step.division).map((d) => (
                <span key={d.name} style={{ background: d.color }} />
              ))}
            </div>
            <p className={styles.by}>{step.by}</p>
          </li>
        ))}
      </ol>
      <Rule />
    </section>
  );
}
