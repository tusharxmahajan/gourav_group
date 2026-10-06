import { testimonial } from '../data/content';
import Rule from './Rule';
import styles from './Testimonial.module.css';

export default function Testimonial() {
  return (
    <section className={styles.section} aria-labelledby="testimonial-title">
      <Rule />
      <div className={styles.row}>
        <div className={styles.labelCell} data-reveal-cell>
          <h2 id="testimonial-title">
            <span className={styles.label}>{testimonial.label}</span>
          </h2>
        </div>
        <div className={styles.quoteCell} data-reveal-cell>
          <blockquote className={styles.quote}>
            <p>{testimonial.quote}</p>
          </blockquote>
          <a className={styles.more} href="#">
            {testimonial.more}
          </a>
        </div>
      </div>
      <Rule />
    </section>
  );
}
