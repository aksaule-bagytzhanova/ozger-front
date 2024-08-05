"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Using useParams from 'next/navigation'
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
  const { id } = useParams(); // Destructuring to get 'id' directly
  const router = useRouter();


  useEffect(() => {
    // We can directly check the 'id' since useParams should provide it synchronously
    if (typeof id === 'string') {
      const fetchWorkoutDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`https://www.ozger.space/api/profile-sports/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setWorkout(response.data);
        } catch (error) {
          console.error('Failed to fetch workout details:', error);
        }
      };

      fetchWorkoutDetails();
    }
  }, [id]); // Dependency array now directly depends on 'id'

  const renderDescription = (description) => {
    return description.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBackClick} className={styles.backButton}>&larr; Оралу</button>
      {workout ? (
        <>
          <h1 className={styles.title}>{workout.title}</h1>
          <div className={styles.descriptionText}>{renderDescription(workout.description)}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WorkoutDetails;
