"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../../styles/Stars.module.css';

interface Star {
  id: number;
  name: string;
  avatar: string;
  description: string;
}

export default function StarsPage() {
  const [stars, setStars] = useState<Star[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchStars = async () => {
        try {
          const response = await axios.get('https://www.ozger.space/api/stars', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setStars(response.data);
        } catch (error) {
          console.error('Ошибка при получении списка звезд:', error);
        }
      };

      fetchStars();
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Жұлдыздар</h1>
      <div className={styles.starsSection}>
        {stars.map((star) => (
          <div className={styles.starContent} key={star.id}>
            <div className={styles.starImageWrapper}>
              <img src={star.avatar} alt={star.name} className={styles.starImage} />
              <div className={styles.starTitleOverlay}>{star.name}</div>
            </div>
            <div className={styles.starDescription}>
              <p>{star.description}</p>
            </div>
            <div className={styles.buttonContainer}>
              <Link href={`/stars/${star.id}/foods`} legacyBehavior>
                <a className={styles.button}>Тамақтану</a>
              </Link>
              <Link href={`/stars/${star.id}/sports`} legacyBehavior>
                <a className={styles.button}>Спорт</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {isLoading && <p>Загрузка...</p>}
    </div>
  );
}
