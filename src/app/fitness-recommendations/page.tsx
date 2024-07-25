"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/FitnessPlan.module.css';

interface Workout {
  id: number;
  title: string;
  description: string;
  photo: string;
  fitness_body_part_type: string;
}

const bodyPartTranslations: { [key: string]: string } = {
  hand: 'Қол',
  leg: 'Аяқ',
  back: 'Арқа',
  chest: 'Кеуде',
  press: 'Пресс',
};

export default function SportsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('https://www.ozger.space/api/profile_sports/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setWorkouts(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка тренировок:', error);
      }
    }
  };

  const createNewWorkoutPlan = async () => {
    setIsCreating(true);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post('https://www.ozger.space/api/profile_sports/', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setWorkouts(response.data);
        setHasGenerated(true);
      } catch (error) {
        console.error('Ошибка при создании нового плана тренировок:', error);
      } finally {
        setIsCreating(false);
      }
    }
  };

  const savePlan = () => {
    setIsSaving(true);
    // Ваш логика сохранения плана тренировок
    setTimeout(() => {
      alert('Жаттығу жоспары сақталды');
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
          {['hand', 'leg', 'back', 'chest', 'press'].map((part) => (
            <div className={styles.section} key={part}>
              <h2 className={styles.workoutTitle}>{bodyPartTranslations[part]}</h2>
              <div className={styles.workoutList}>
                {workouts.filter(workout => workout.fitness_body_part_type === part).map((workout) => (
                  <div className={styles.workoutItem} key={workout.id}>
                    <div className={styles.workoutImageWrapper}>
                      <img src={workout.photo || '/placeholder.jpg'} alt={workout.title} className={styles.workoutImage} />
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
