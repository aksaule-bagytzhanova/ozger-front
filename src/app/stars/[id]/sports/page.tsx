"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import styles from '../../../../styles/Sports.module.css';

interface Sport {
  id: number;
  photo: string;
  title: string;
  description: string;
  video_url: string;
}

export default function SportsPage() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && id) {
      const fetchSports = async () => {
        try {
          const response = await axios.get(`http://185.129.51.174:8001/api/stars/${id}/sports`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setSports(response.data);
        } catch (error) {
          console.error('Ошибка при получении списка спортов:', error);
        }
      };

      fetchSports();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Спорт</h1>
      <div className={styles.sportsSection}>
        {sports.map((sport, index) => (
          <div className={styles.sportContent} key={index}>
            <div className={styles.sportImageWrapper}>
              <img src={sport.photo} alt={sport.title} className={styles.sportImage} />
              <div className={styles.sportTitleOverlay}>{sport.title}</div>
            </div>
            <div className={styles.sportDescription}>
              <p>{sport.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {isLoading && <p>Загрузка...</p>}
    </div>
  );
}
