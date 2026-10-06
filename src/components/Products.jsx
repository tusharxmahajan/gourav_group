import { anchors, products } from '../data/content';
import ProductCard from './ProductCard';
import Rule from './Rule';
import styles from './Products.module.css';

export default function Products() {
  return (
    <section id={anchors.products} className={styles.section} aria-labelledby="products-title">
      <div className={styles.header} data-reveal>
        <h2 id="products-title" className={styles.title}>
          {products.title}
        </h2>
        <a className={styles.catalogue} href="#">
          {products.catalogue}
        </a>
      </div>
      <Rule />
      <div className={styles.cards}>
        {products.cards.map((card) => (
          <ProductCard key={card.division} card={card} />
        ))}
      </div>
      <Rule />
    </section>
  );
}
