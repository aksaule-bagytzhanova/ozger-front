"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../styles/NutritionistRecommendations.module.css';

export default function NutritionistRecommendations() {
  const [recommendation, setRecommendation] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDay, setSelectedDay] = useState('дүйсенбі');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchLastRecommendation = async () => {
        try {
          const response = await axios.get('https://www.ozger.space/api/recommendations/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = response.data;
          setRecommendation(data[0]);
        } catch (error) {
          console.error('Ұсыныстарды алу кезінде қате орын алды:', error);
        }
      };

      fetchLastRecommendation();
    }
  }, []);

  const createNewRecommendation = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsCreating(true);
      try {
        const response = await axios.post('https://www.ozger.space/api/recommendations/', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const newRecommendation = response.data;
        setRecommendation(newRecommendation);
      } catch (error) {
        console.error('Жаңа ұсынысты жасау кезінде қате орын алды:', error);
      } finally {
        setIsCreating(false);
      }
    }
  };

  const handleRecipeClick = (recipe, title) => {
    localStorage.setItem('recipe', recipe);
    localStorage.setItem('recipeTitle', title);
    router.push('/recipe');
  };

  const handleSaveClick = () => {
    alert(`Saved for ${selectedDay}`);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Нутрициологтың ұсыныстары</h1>
      {!recommendation && (
        <button className={styles.createPlanButton} onClick={createNewRecommendation}>
          {isCreating ? 'Жасалуда...' : 'Жаңа тамақтану жоспарын жасаңыз'}
        </button>
      )}
      {recommendation && (
        <>
          <div className={styles.mealSection}>
            <h2 className={styles.mealTitle}>Таңғы ас</h2>
            <div className={styles.mealContent}>
              <div className={styles.mealImageWrapper}>
                <img src="../images/human_food/1.jpg" alt="Таңғы ас" className={styles.mealImage} />
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
                <img src="../images/human_food/2.jpg" alt="Түскі ас" className={styles.mealImage} />
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
                <img src="../images/human_food/3.jpg" alt="Кешкі ас" className={styles.mealImage} />
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

          <div className={styles.saveSection}>
            <select className={styles.daySelect} value={selectedDay} onChange={handleDayChange}>
              <option value="дүйсенбі">Дүйсенбі</option>
              <option value="сейсенбі">Сейсенбі</option>
              <option value="сәрсенбі">Сәрсенбі</option>
              <option value="бейсенбі">Бейсенбі</option>
              <option value="жұма">Жұма</option>
              <option value="сенбі">Сенбі</option>
              <option value="жексенбі">Жексенбі</option>
            </select>
            <button 
              className={styles.savePlanButton} 
              onClick={handleSaveClick}
            >
              Сақтау
            </button>
          </div>

          <button 
            className={styles.createPlanButton} 
            onClick={createNewRecommendation} 
            disabled={isCreating}
          >
            {isCreating ? 'Жасалуда...' : 'Жаңа тамақтану жоспарын жасаңыз'}
          </button>
        </>
      )}
    </div>
  );
}

const renderNutritionalInfo = (description) => {
  return (
    <ul className={styles.nutritionalInfo}>
      {description.split('\n').map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  );
};
