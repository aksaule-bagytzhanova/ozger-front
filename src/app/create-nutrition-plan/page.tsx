// src/app/create-nutrition-plan/page.tsx
"use client"; // Добавляем директиву

import Link from 'next/link';
import styles from '../../styles/CreateNutritionPlan.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
  question: string;
  type: 'options' | 'number' | 'date' | 'text';
  options?: string[];
}

const CreateNutritionPlan = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [genders, setGenders] = useState([]);
  const [targets, setTargets] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: ''
  });

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        setQuestions([
          { question: "Сіздің жынысыңызды қалай сипаттайсыз?", type: 'options', options: ['Ер адам', 'Әйел адам'] },
          { question: "Сіздің идеал салмақ мақсатыңыз қандай?", type: 'number' },
          { question: "Сіздің туған күніңіз қашан?", type: 'date' },
          { question: "Сіздің бойыңыз қанша?", type: 'number' },
          { question: "Сіздің қазіргі салмағыңыз қанша?", type: 'number' },
          { question: "Нақты қандай мақсатқа жетуді қалайсыз?", type: 'options', options: ['Салмақты тастау', 'Салмақ қосу', 'Бұлшықет массасын қосу', 'Физикалық белсенділіктерді қосу'] },
          { question: "Аллергендеріңізді көрсетіңіз", type: 'text' }
        ]);
      } catch (error) {
        console.error('Error fetching choices:', error);
      }
    };

    fetchChoices();
  }, []);

  const handleOptionClick = (answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`question${currentQuestionIndex + 1}`]: answer,
    }));
    setProgress((prev) => Math.min(prev + (100 / questions.length), 100)); // Увеличение прогресса на 1/7 части
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`question${currentQuestionIndex + 1}`]: value,
    }));
  };

  const handleNextClick = () => {
    setProgress((prev) => Math.min(prev + (100 / questions.length), 100)); // Увеличение прогресса на 1/7 части
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Сохранение данных в localStorage
      localStorage.setItem('nutritionPlan', JSON.stringify(answers));
      window.location.href = '/sign-up'; // Переход на страницу регистрации
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" legacyBehavior>
          <a className={styles.backButton}>&larr;</a>
        </Link>
        <span className={styles.headerText}>ДЕМОГРАФИЯЛЫҚ ПРОФИЛЬ</span>
      </div>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {currentQuestionIndex < questions.length ? (
        <>
          <h1 className={styles.title}>{questions[currentQuestionIndex].question}</h1>
          <div className={styles.buttonContainer}>
            {questions[currentQuestionIndex].type === 'options' &&
              questions[currentQuestionIndex].options?.map((option, index) => (
                <button key={index} className={styles.optionButton} onClick={() => handleOptionClick(option)}>
                  {option}
                </button>
              ))}
            {questions[currentQuestionIndex].type === 'number' && (
              <>
                <input
                  type="number"
                  className={styles.inputField}
                  onChange={handleInputChange}
                />
                <button className={styles.nextButton} onClick={handleNextClick}>Next</button>
              </>
            )}
            {questions[currentQuestionIndex].type === 'date' && (
              <>
                <input
                  type="date"
                  className={styles.inputField}
                  onChange={handleInputChange}
                />
                <button className={styles.nextButton} onClick={handleNextClick}>Next</button>
              </>
            )}
            {questions[currentQuestionIndex].type === 'text' && (
              <>
                <textarea
                  className={styles.textArea}
                  onChange={handleInputChange}
                ></textarea>
                <button className={styles.nextButton} onClick={handleNextClick}>Next</button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <h1 className={styles.title}>Thank you!</h1>
          <p>Create a personalized nutrition plan</p>
          <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default CreateNutritionPlan;
