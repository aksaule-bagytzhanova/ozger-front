// src/app/sign-up/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from '../../styles/SignUp.module.css';

interface NutritionPlan {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
}

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);

  useEffect(() => {
    // Загрузка данных из localStorage
    const savedNutritionPlan = localStorage.getItem('nutritionPlan');
    if (savedNutritionPlan) {
      setNutritionPlan(JSON.parse(savedNutritionPlan));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      email: email,
      password1: password,
      password2: password2,
    };

    try {
      const response = await axios.post('http://185.129.51.174:8001/api/auth/registration/', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      if (response.status === 201) {
        // Успешная регистрация
        const token = data.access;
        localStorage.setItem('token', token);

        // Подготовка данных для обновления профиля
        if (nutritionPlan) {
          const profileData = {
            date_of_birth: nutritionPlan.question3,
            gender: nutritionPlan.question1 === 'Male' ? 'M' : 'F',
            weight: parseFloat(nutritionPlan.question5),
            height: parseFloat(nutritionPlan.question4),
            ideal_weight: parseFloat(nutritionPlan.question2),
            target: {
              'Lose weight': 'LW',
              'Gain weight': 'GW',
              'Gain muscle mass': 'GMM',
              'Add physical activities': 'APA'
            }[nutritionPlan.question6],
            allergy: nutritionPlan.question7
          };

          await axios.put('http://185.129.51.174:8001/api/profile/update/', profileData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
        }

        window.location.href = '/';
      } else {
        // Ошибка регистрации
        setError(data.non_field_errors || 'Registration failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create an account</h2>
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
        <input
          type="password"
          placeholder="Confirm password"
          className={styles.input}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Continue'}
        </button>
      </form>
      <div className={styles.footer}>
        <p className={styles.footerText}>
          Already have an account?{' '}
          <Link href="/login" passHref legacyBehavior>
            <a className={styles.signUpLink}>Log In</a>
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

export default SignUpPage;
