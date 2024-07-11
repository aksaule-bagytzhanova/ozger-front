"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Импортируем useRouter из 'next/navigation'
import styles from '../../styles/NutritionistRecommendations.module.css';

export default function NutritionistRecommendations() {
  const [recommendation, setRecommendation] = useState(null);
  const [isCreating, setIsCreating] = useState(false); // Добавляем состояние для отслеживания процесса создания
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchLastRecommendation = async () => {
        try {
          const response = await axios.get('http://185.129.51.174:8001/api/recommendations/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = response.data;
          setRecommendation(data[0]);
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
      };

      fetchLastRecommendation();
    }
  }, []);

  const createNewRecommendation = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsCreating(true); // Устанавливаем состояние в true, когда начинается создание плана
      try {
        const response = await axios.post('http://185.129.51.174:8001/api/recommendations/', {
          // Данные для новой рекомендации
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const newRecommendation = response.data;
        setRecommendation(newRecommendation);
      } catch (error) {
        console.error('Error creating new recommendation:', error);
      } finally {
        setIsCreating(false); // Сбрасываем состояние после завершения процесса
      }
    }
  };

  const handleRecipeClick = (recipe, title) => {
    // Сохранить рецепт и название в localStorage или передать через query параметры
    localStorage.setItem('recipe', recipe);
    localStorage.setItem('recipeTitle', title);
    router.push('/recipe');
  };

  if (!recommendation) {
    return (<button 
      className={styles.createPlanButton} 
      onClick={createNewRecommendation} 
      disabled={isCreating}
    >
      {isCreating ? 'Creating...' : 'Create a new meal plan'}
    </button>);
  }

  const renderNutritionalInfo = (description) => {
    return description.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recommendations from the nutritionist</h1>
      <div className={styles.mealSection}>
        <h2 className={styles.mealTitle}>Breakfast</h2>
        <div className={styles.mealContent}>
          <div className={styles.mealItem}>
            <div className={styles.mealImage}>{recommendation.breakfast.title}</div>
            <button className={styles.recipeButton} onClick={() => handleRecipeClick(recommendation.breakfast.recipe, recommendation.breakfast.title)}>Recipe</button>
            <div className={styles.nutritionalInfo}>
              {renderNutritionalInfo(recommendation.breakfast.description)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mealSection}>
        <h2 className={styles.mealTitle}>Lunch</h2>
        <div className={styles.mealContent}>
          <div className={styles.mealItem}>
            <div className={styles.mealImage}>{recommendation.lunch.title}</div>
            <button className={styles.recipeButton} onClick={() => handleRecipeClick(recommendation.lunch.recipe, recommendation.lunch.title)}>Recipe</button>
            <div className={styles.nutritionalInfo}>
              {renderNutritionalInfo(recommendation.lunch.description)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mealSection}>
        <h2 className={styles.mealTitle}>Dinner</h2>
        <div className={styles.mealContent}>
          <div className={styles.mealItem}>
            <div className={styles.mealImage}>{recommendation.dinner.title}</div>
            <button className={styles.recipeButton} onClick={() => handleRecipeClick(recommendation.dinner.recipe, recommendation.dinner.title)}>Recipe</button>
            <div className={styles.nutritionalInfo}>
              {renderNutritionalInfo(recommendation.dinner.description)}
            </div>
          </div>
        </div>
      </div>
      
      <button 
        className={styles.createPlanButton} 
        onClick={createNewRecommendation} 
        disabled={isCreating}
      >
        {isCreating ? 'Creating...' : 'Create a new meal plan'}
      </button>
    </div>
  );
}
