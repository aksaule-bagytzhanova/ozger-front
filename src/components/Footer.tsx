// src/components/Footer.tsx
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="/" passHref legacyBehavior>
        <a className={styles.logo}>Ozger AI</a>
      </Link>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/create-nutrition-plan" passHref legacyBehavior>
              <a>Create a nutrition plan</a>
            </Link>
          </li>
          <li>
            <Link href="/my-character" passHref legacyBehavior>
              <a>My character</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.legal}>
        <p>© 2024 Ozger AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
