// src/app/my-parameters/page.tsx
"use client";

import React, { useState } from 'react';
import styles from '../../styles/MyParameters.module.css';

export default function MyParameters() {
  const [parameters, setParameters] = useState({
    dateOfBirth: '04.12.2000',
    sex: 'Female',
    currentWeight: 75,
    weightGoal: 62,
    height: 170,
    allergens: 'text',
    selectedPlan: 'Lose weight',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParameters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Отправка данных на сервер
    console.log('Сохраненные параметры:', parameters);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My parameters</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.column}>
            <label>Date of birth</label>
            <input
              type="text"
              name="dateOfBirth"
              value={parameters.dateOfBirth}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label>Sex</label>
            <select
              name="sex"
              value={parameters.sex}
              onChange={handleInputChange}
              className={styles.input}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label>Current weight</label>
            <input
              type="text"
              name="currentWeight"
              value={parameters.currentWeight}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label>Weight goal</label>
            <input
              type="text"
              name="weightGoal"
              value={parameters.weightGoal}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label>Height</label>
            <input
              type="text"
              name="height"
              value={parameters.height}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label>Selected plan</label>
            <input
              type="text"
              name="selectedPlan"
              value={parameters.selectedPlan}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label>Allergens</label>
            <input
              type="text"
              name="allergens"
              value={parameters.allergens}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </div>
        <button type="submit" className={styles.button}>Save</button>
      </form>
    </div>
  );
}
