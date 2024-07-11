// src/components/Header.tsx
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
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
          <li className={styles.langSwitch}>
            <a href="#">EN</a>
            <a href="#">KZ</a>
          </li>
          <li>
          <Link href="/login" passHref legacyBehavior>
              <button className={styles.logInButton}>Log in</button>
            </Link>
          </li>
          <li>
            <Link href="/sign-up" passHref legacyBehavior>
              <button className={styles.signUpButton}></button>
            </Link>
          </li>
        </ul>
      </nav>
      </div>
    </header>
  );
};

export default Header;
