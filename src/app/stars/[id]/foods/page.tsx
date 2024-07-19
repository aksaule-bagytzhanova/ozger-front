"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import styles from '../../../../styles/NutritionistRecommendations.module.css';

interface Food {
  id: number;
  title: string;
  description: string;
  recipe: string;
}

interface Recommendation {
  breakfast: Food;
  lunch: Food;
  dinner: Food;
}

export default function FoodsPage() {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && id) {
      const fetchFoods = async () => {
        try {
          const response = await axios.get(`http://185.129.51.174:8001/api/stars/${id}/foods`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = response.data[0]; // Предполагается, что в ответе приходит массив
          setRecommendation({
            breakfast: data.breakfast,
            lunch: data.lunch,
            dinner: data.dinner
          });
        } catch (error) {
          console.error('Ошибка при получении списка блюд:', error);
        }
      };

      fetchFoods();
    }
  }, [id]);

  const handleRecipeClick = (recipe: string, title: string) => {
    localStorage.setItem('recipe', recipe);
    localStorage.setItem('recipeTitle', title);
    router.push('/recipe');
  };

  if (!recommendation) {
    return null; // Возвращаем null, если нет данных
  }

  const renderNutritionalInfo = (description: string) => {
    return (
      <ul className={styles.nutritionalInfo}>
        {description.split('\n').map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Нутрициологтың ұсыныстары</h1>
      <div className={styles.mealSection}>
        <h2 className={styles.mealTitle}>Таңғы ас</h2>
        <div className={styles.mealContent}>
          <div className={styles.mealImageWrapper}>
            <img src="../../images/human_food/1.jpg" alt="Таңғы ас" className={styles.mealImage} />
            <div className={styles.mealTitleOverlay}>{recommendation.breakfast.title}</div>
          </div>
          <div className={styles.mealItem}>
            <button className={styles.recipeButton} onClick={() => handleRecipeClick(recommendation.breakfast.recipe, recommendation.breakfast.title)}>Рецепт</button>
            <div className={styles.nutritionalInfo}>
              {renderNutritionalInfo(recommendation.breakfast.description)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mealSection}>
        <h2 className={styles.mealTitle}>Түскі ас</h2>
        <div className={styles.mealContent}>
          <div className={styles.mealImageWrapper}>
            <img src="../../images/human_food/2.jpg" alt="Түскі ас" className={styles.mealImage} />
            <div className={styles.mealTitleOverlay}>{recommendation.lunch.title}</div>
          </div>
          <div className={styles.mealItem}>
            <button className={styles.recipeButton} onClick={() => handleRecipeClick(recommendation.lunch.recipe, recommendation.lunch.title)}>Рецепт</button>
            <div className={styles.nutritionalInfo}>
              {renderNutritionalInfo(recommendation.lunch.description)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mealSection}>
        <h2 className={styles.mealTitle}>Кешкі ас</h2>
        <div className={styles.mealContent}>
          <div className={styles.mealImageWrapper}>
            <img src="../../images/human_food/3.jpg" alt="Кешкі ас" className={styles.mealImage} />
            <div className={styles.mealTitleOverlay}>{recommendation.dinner.title}</div>
          </div>
          <div className={styles.mealItem}>
            <button className={styles.recipeButton} onClick={() => handleRecipeClick(recommendation.dinner.recipe, recommendation.dinner.title)}>Рецепт</button>
            <div className={styles.nutritionalInfo}>
              {renderNutritionalInfo(recommendation.dinner.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
