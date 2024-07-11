// src/components/Footer.tsx
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.legal}>
        <p>© 2024 Ozger AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
