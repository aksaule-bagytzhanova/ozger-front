"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Импортируем useRouter из 'next/navigation'
import styles from '../../styles/Recipe.module.css';

const RecipePage = () => {
  const [recipe, setRecipe] = useState('');
  const [title, setTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedRecipe = localStorage.getItem('recipe');
    const savedTitle = localStorage.getItem('recipeTitle');
    if (savedRecipe && savedTitle) {
      setRecipe(savedRecipe);
      setTitle(savedTitle);
    }
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBackClick} className={styles.backButton}>&larr; Back</button>
      <h1 className={styles.title}>{title}</h1>
      <pre className={styles.recipeText}>{recipe}</pre>
    </div>
  );
};

export default RecipePage;
