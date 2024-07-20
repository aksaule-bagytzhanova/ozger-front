import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <Link href="/" passHref legacyBehavior>
          <a className={styles.logo}>Ozger AI</a>
        </Link>
      </div>
      <ul className={styles.navList}>
      </ul>
      <div className={styles.legal}>
        <p>© 2024 Ozger AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
