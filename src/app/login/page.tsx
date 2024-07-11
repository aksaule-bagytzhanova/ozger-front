"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://185.129.51.174:8001/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Успешный вход, можно сохранить токен и перенаправить пользователя
        localStorage.setItem('token', data.access);
        window.location.href = '/'; // замените '/dashboard' на нужный путь
      } else {
        // Ошибка входа
        setError(data.detail || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome back</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Continue'}
        </button>
      </form>
      <div className={styles.footer}>
        <p className={styles.footerText}>
          Don't have an account?{' '}
          <Link href="/sign-up" passHref legacyBehavior>
            <a className={styles.signUpLink}>Sign Up</a>
          </Link>
        </p>
        <div className={styles.separatorContainer}>
          <div className={styles.separator}></div>
          <p className={styles.orText}>OR</p>
          <div className={styles.separator}></div>
        </div>
        <button className={styles.googleButton}>Continue with Google</button>
      </div>
    </div>
  );
};

export default LoginPage;
