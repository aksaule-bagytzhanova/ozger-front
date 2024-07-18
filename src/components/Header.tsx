"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    window.location.href = '/'; // Перенаправление на страницу входа после выхода
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" passHref legacyBehavior>
          <a className={styles.logo}>Ozger AI</a>
        </Link>
        <nav>
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
              <><li>
                  <Link href="/my-parameters" passHref legacyBehavior>
                    <a>Менің параметрлерім</a>
                  </Link>
                </li><li className={styles.dropdown}>
                    <a>Ұсыныстар</a>
                    <div className={styles.dropdownContent}>
                      <Link href="/nutritionist-recommendations" passHref legacyBehavior>
                        <a>Нутрициолог дәрігердің ұсыныстары</a>
                      </Link>
                      <Link href="/recommendations/fitness-instructor" passHref legacyBehavior>
                        <a>Фитнес жаттықтырушысының ұсыныстары</a>
                      </Link>
                    </div>
                  </li></>
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
