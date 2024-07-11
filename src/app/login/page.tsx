// src/app/login/page.tsx
import React from 'react';
import styles from '../../styles/Login.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome back</h2>
      <form className={styles.form}>
        <input type="email" placeholder="Email address" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />
        <button type="submit" className={styles.button}>Continue</button>
      </form>
      <div className={styles.footer}>
        <p className={styles.footerText}>Don't have an account? <a href="#" className={styles.signUpLink}>Sign Up</a></p>
        <div className={styles.separatorContainer}>
          <div className={styles.separator}></div>
          <p className={styles.orText}>OR</p>
          <div className={styles.separator}></div>
        </div>
        <button className={styles.googleButton}>Continue with Google</button>
      </div>
    </div>
  );
}
