// src/app/my-parameters/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/MyParameters.module.css';

interface Parameters {
  dateOfBirth: string;
  sex: string;
  currentWeight: string;
  weightGoal: string;
  height: string;
  allergens: string;
  selectedPlan: string;
}

const targets = {
  'LW': 'Lose weight',
  'GW': 'Gain weight',
  'GMM': 'Gain muscle mass',
  'APA': 'Add physical activities'
} as const;

const MyParameters = () => {
  const [parameters, setParameters] = useState<Parameters>({
    dateOfBirth: '',
    sex: '',
    currentWeight: '',
    weightGoal: '',
    height: '',
    allergens: '',
    selectedPlan: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get('http://185.129.51.174:8001/api/profile/retrieve/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const data = response.data;
          setParameters({
            dateOfBirth: data.date_of_birth,
            sex: data.gender === 'M' ? 'Male' : 'Female',
            currentWeight: data.weight.toString(),
            weightGoal: data.ideal_weight.toString(),
            height: data.height.toString(),
            allergens: data.allergy,
            selectedPlan: targets[data.target as keyof typeof targets] || ''
          });
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfile();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParameters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      const profileData = {
        date_of_birth: parameters.dateOfBirth,
        gender: parameters.sex === 'Male' ? 'M' : 'F',
        weight: parseFloat(parameters.currentWeight),
        height: parseFloat(parameters.height),
        ideal_weight: parseFloat(parameters.weightGoal),
        target: Object.keys(targets).find(key => targets[key as keyof typeof targets] === parameters.selectedPlan),
        allergy: parameters.allergens
      };

      try {
        const response = await axios.put('http://185.129.51.174:8001/api/profile/update/', profileData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Profile updated:', response.data);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Менің параметрлерім</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.column}>
            <label>Туған күніңіз</label>
            <input
              type="text"
              name="dateOfBirth"
              value={parameters.dateOfBirth}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label>Жынысыңыз</label>
            <select
              name="sex"
              value={parameters.sex}
              onChange={handleInputChange}
              className={styles.input}
            >
              <option value="Male">Ер адам</option>
              <option value="Female">Әйел адам</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label>Қазіргі салмағыңыз</label>
            <input
              type="text"
              name="currentWeight"
              value={parameters.currentWeight}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label>Мақсатты салмағыңыз</label>
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
            <label>Бойыңыз</label>
            <input
              type="text"
              name="height"
              value={parameters.height}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.column}>
            <label>Таңдалған жоспарыңыз</label>
            <select
              name="selectedPlan"
              value={parameters.selectedPlan}
              onChange={handleInputChange}
              className={styles.input}
            >
              <option value="Lose weight">Салмақты тастау</option>
              <option value="Gain weight">Салмақ қосу</option>
              <option value="Gain muscle mass">Бұлшықет массасын қосу</option>
              <option value="Add physical activities">Физикалық белсенділіктерді қосу</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label>Аллергендер</label>
            <input
              type="text"
              name="allergens"
              value={parameters.allergens}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </div>
        <button type="submit" className={styles.button}>Сақтау</button>
      </form>
    </div>
  );
}

export default MyParameters;
