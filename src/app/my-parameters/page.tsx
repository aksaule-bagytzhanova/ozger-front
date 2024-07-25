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
  injuries: string;
  time_limit: string;
}

const targets = {
  'LW': 'Lose weight',
  'GW': 'Gain weight',
  'GMM': 'Gain muscle mass',
  'APA': 'Add physical activities'
} as const;

const time_limits = {
  'onemonth': 'One month',
  'twoweek': 'Two week',
  'twomonth': 'Two month',
  'sixmonth': 'Six month'
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
    injuries: '',
    time_limit: '',
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
            dateOfBirth: data.date_of_birth || '',
            sex: data.gender === 'M' ? 'Male' : data.gender === 'F' ? 'Female' : '',
            currentWeight: data.weight !== null && data.weight !== undefined ? data.weight.toString() : '',
            weightGoal: data.ideal_weight !== null && data.ideal_weight !== undefined ? data.ideal_weight.toString() : '',
            height: data.height !== null && data.height !== undefined ? data.height.toString() : '',
            allergens: data.allergy || '',
            selectedPlan: targets[data.target as keyof typeof targets] || '',
            injuries: data.injuries !== null && data.injuries !== undefined ? data.injuries.toString() : '',
            time_limit: time_limits[data.time_limit as keyof typeof time_limits] || '',
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
        allergy: parameters.allergens,
        injuries: parameters.injuries,
        time_limit: Object.keys(time_limits).find(key => time_limits[key as keyof typeof time_limits] === parameters.time_limit),
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
          <div className={styles.column}>
            <label>Физикалық жарақаттар</label>
            <input
              type="text"
              name="injuries"
              value={parameters.injuries}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.column}>
            <label>Таңдалған жоспарыңыз</label>
            <select
              name="time_limit"
              value={parameters.time_limit}
              onChange={handleInputChange}
              className={styles.input}
            >
              <option value="One month">Бір ай ішінде</option>
              <option value="Two week">2-3 апта ішінде</option>
              <option value="Two month">2-3 ай ішінде</option>
              <option value="Six month">Жарты жыл ішінде</option>
            </select> 
          </div>
        <button type="submit" className={styles.button}>Сақтау</button>
      </form>
    </div>
  );
}

export default MyParameters;
