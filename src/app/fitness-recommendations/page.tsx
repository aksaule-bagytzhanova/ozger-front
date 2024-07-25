"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/FitnessPlan.module.css';

interface Workout {
  id: number;
  name: string;
  description: string;
  image: string;
}

export default function SportsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && hasGenerated) {
      const fetchWorkouts = async () => {
        try {
          const response = await axios.get('https://www.ozger.space/api/workouts', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setWorkouts(response.data);
        } catch (error) {
          console.error('Ошибка при получении списка тренировок:', error);
        }
      };

      fetchWorkouts();
    }
  }, [hasGenerated]);

  const createNewWorkoutPlan = () => {
    setIsCreating(true);
    // Ваш логика создания нового плана тренировок
    setTimeout(() => {
      setHasGenerated(true);
      setIsCreating(false);
    }, 2000); // Имитация задержки запроса
  };

  const savePlan = () => {
    setIsSaving(true);
    // Ваш логика сохранения плана тренировок
    setTimeout(() => {
      alert('План тренировки сохранен');
      setIsSaving(false);
    }, 2000); // Имитация задержки запроса
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Фитнес жаттықтырушысының ұсыныстары</h1>
      {!hasGenerated && (
        <button 
          className={styles.createPlanButton} 
          onClick={createNewWorkoutPlan} 
          disabled={isCreating}
        >
          {isCreating ? 'Жасалуда...' : 'Жаңа жаттығу жоспарын жасаңыз'}
        </button>
      )}
      
      {hasGenerated && (
        <>
          {['Руки', 'Ноги', 'Плечи', 'Спина', 'Пресс'].map((part) => (
            <div className={styles.section} key={part}>
              <h2 className={styles.workoutTitle}>{part}</h2>
              <div className={styles.workoutList}>
                {workouts.filter(workout => workout.name.includes(part)).slice(0, 3).map((workout) => (
                  <div className={styles.workoutItem} key={workout.id}>
                    <div className={styles.workoutImageWrapper}>
                      <img src={workout.image || '/placeholder.jpg'} alt={workout.name} className={styles.workoutImage} />
                    </div>
                    <button className={styles.workoutButton}>Как выполнять</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <button 
            className={styles.createPlanButton} 
            onClick={createNewWorkoutPlan} 
            disabled={isCreating}
          >
            {isCreating ? 'Жасалуда...' : 'Жаңа жаттығу жоспарын жасаңыз'}
          </button>
          <button 
            className={styles.savePlanButton} 
            onClick={savePlan} 
            disabled={isSaving}
          >
            {isSaving ? 'Сақталуда...' : 'Бұл планды сақтау'}
          </button>
        </>
      )}
    </div>
  );
}
