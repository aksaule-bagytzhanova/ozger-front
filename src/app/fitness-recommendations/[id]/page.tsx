"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../../../styles/Workout.module.css';

interface Workout {
  id: number;
  title: string;
  description: string;
  photo: string;
}

const WorkoutDetails = () => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (id && typeof id === 'string') { // Additional type checking
        fetchWorkoutDetails(id);
      }
    }
  }, [router.isReady, router.query]);
  

  const fetchWorkoutDetails = async (id: string) => {
    const response = await axios.get(`https://www.ozger.space/api/profile-sports/${id}`);
    setWorkout(response.data);
  };

  return (
    <div className={styles.container}>
      {workout ? (
        <>
          <h1 className={styles.title}>{workout.title}</h1>
          <img src={workout.photo} alt={workout.title} className={styles.image} />
          <p>{workout.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WorkoutDetails;
