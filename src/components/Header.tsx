"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import Logo from '../../public/logo_ozger.svg'; // Убедитесь, что путь корректен

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Проверка наличия токена в локальном хранилище
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/'; // Перенаправление на главную страницу после выхода
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" passHref legacyBehavior>
          <a className={styles.logo}>
            <Logo className={styles.logoImage} />
          </a>
        </Link>
        <div className={styles.burgerMenu} onClick={toggleMenu}>
          <div className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineOpen1 : ''}`} />
          <div className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineOpen2 : ''}`} />
          <div className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineOpen3 : ''}`} />
        </div>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link href="/create-nutrition-plan" passHref legacyBehavior>
                    <a>Тамақтану жоспарын жасаңыз</a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/my-parameters" passHref legacyBehavior>
                    <a>Менің параметрлерім</a>
                  </Link>
                </li>
                <li className={styles.dropdown}>
                  <a>Ұсыныстар</a>
                  <div className={styles.dropdownContent}>
                    <Link href="/nutritionist-recommendations" passHref legacyBehavior>
                      <a>Нутрициолог дәрігердің ұсыныстары</a>
                    </Link>
                    <Link href="/recommendations/fitness-instructor" passHref legacyBehavior>
                      <a>Фитнес жаттықтырушысының ұсыныстары</a>
                    </Link>
                  </div>
                </li>
                <li>
                  <Link href="/stars" passHref legacyBehavior>
                    <a>Жұлдыздар</a>
                  </Link>
                </li>
              </>
            )}
            <li className={styles.langSwitch}>
              <a href="#">RU</a>
              <a href="#">KZ</a>
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link href="/login" passHref legacyBehavior>
                    <button className={styles.logInButton}>Кіру</button>
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" passHref legacyBehavior>
                    <button className={styles.signUpButton}></button>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button className={styles.signOutButton} onClick={handleSignOut}>Шығу</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
