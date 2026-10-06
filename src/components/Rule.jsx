import styles from './Rule.module.css';

/** Full-bleed horizontal section line with crosshairs on the container edges (`marks={false}` for the plain line). */
export default function Rule({ variant = 'light', marks = true, className = '' }) {
  return (
    <div className={`${styles.rule} ${styles[variant]} ${className}`} aria-hidden="true">
      {marks && <div className={styles.marks} />}
    </div>
  );
}
