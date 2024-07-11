// src/app/create-nutrition-plan/page.tsx
"use client"; // Добавляем директиву

import Link from 'next/link';
import styles from '../../styles/CreateNutritionPlan.module.css';
import { useState } from 'react';

const questions = [
  { question: "Which sex best describes you?", type: "options", options: ["Male", "Female"] },
  { question: "What is your ideal weight goal?", type: "number" },
  { question: "What is your date of birth?", type: "date" },
  { question: "What's your height?", type: "number" },
  { question: "What’s your current weight?", type: "number" },
  { question: "What exactly do you want to do?", type: "options", options: ["Lose weight", "Gain weight", "Gain muscle mass", "Add physical activities"] },
  { question: "Please list your allergens?", type: "text" }
];

export default function CreateNutritionPlan() {
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
      const response = await fetch('/api/nutrition-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
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
        <span className={styles.headerText}>DEMOGRAPHIC PROFILE</span>
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
            {questions[currentQuestionIndex].type === "options" &&
              questions[currentQuestionIndex].options.map((option, index) => (
                <button key={index} className={styles.optionButton} onClick={() => handleOptionClick(option)}>
                  {option}
                </button>
              ))}
            {questions[currentQuestionIndex].type === "number" && (
              <>
                <input
                  type="number"
                  className={styles.inputField}
                  onChange={handleInputChange}
                />
                <button className={styles.nextButton} onClick={handleNextClick}>Next</button>
              </>
            )}
            {questions[currentQuestionIndex].type === "date" && (
              <>
                <input
                  type="date"
                  className={styles.inputField}
                  onChange={handleInputChange}
                />
                <button className={styles.nextButton} onClick={handleNextClick}>Next</button>
              </>
            )}
            {questions[currentQuestionIndex].type === "text" && (
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
