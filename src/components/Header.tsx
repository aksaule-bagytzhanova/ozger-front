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
                  <a>Create a nutrition plan</a>
                  </Link>
                </li>
              </>
            ) : (
              <><li>
                  <Link href="/my-parameters" passHref legacyBehavior>
                    <a>My parameters</a>
                  </Link>
                </li><li className={styles.dropdown}>
                    <a>Recommendations</a>
                    <div className={styles.dropdownContent}>
                      <Link href="/nutritionist-recommendations" passHref legacyBehavior>
                        <a>From Nutritionist Doctor</a>
                      </Link>
                      <Link href="/recommendations/dietitian" passHref legacyBehavior>
                        <a>From Dietitian Doctor</a>
                      </Link>
                      <Link href="/recommendations/fitness-instructor" passHref legacyBehavior>
                        <a>From Fitness Instructor</a>
                      </Link>
                    </div>
                  </li></>
            )}
            <li>
              <Link href="/my-character" passHref legacyBehavior>
                <a>My character</a>
              </Link>
            </li>
            <li className={styles.langSwitch}>
              <a href="#">EN</a>
              <a href="#">KZ</a>
            </li>
            {!isAuthenticated ? (
              <>
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
              </>
            ) : (
              <li>
                <button className={styles.signOutButton} onClick={handleSignOut}>Sign out</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
