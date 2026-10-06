import styles from './GridGuides.module.css';

/**
 * Vertical column guides. A background layer: place it in a bleed grid
 * alongside the content, both in row 1 (grid stacking).
 */
export default function GridGuides({ tone = 'light', className = '' }) {
  return <div className={`${styles.guides} ${styles[tone]} ${className}`} aria-hidden="true" />;
}
