"use client";

import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.gradientSection}>
        <main className={styles.main}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>
              Дұрыс тамақтаныңыз <br />
              Дұрыс жаттығыңыз <br />
              Өзіңізді жақсы сезініңіз
            </h1>
            <div className={styles.buttonContainer}>
              <Link href="/create-nutrition-plan" passHref legacyBehavior>
                <button className={styles.button} data-text="Жекеленген тамақтану жоспарын алыңыз"></button>
              </Link>
            </div>
          </div>
        </main>
      </div>
      <div className={styles.whiteSection}>
        <div className={styles.howItWorksContainer}>
          <h3 className={styles.howItWorksTitle}>Қалай жұмыс істейді?</h3>
          <p className={styles.howItWorksText}>Өз параметрлеріңізді енгізіңіз, <br />
          сонда біз сізге арнайы жасалған тамақтану мен <br />
          жаттығу жоспарын әзірлейміз!</p>
        </div>
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.videoCard}`}>
            <h3 className={styles.cardTitle}>Video 1</h3>
            <iframe src="https://www.youtube.com/embed/b73BI9eUkjM?list=RDz9tifvQSu-g&index=10" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
