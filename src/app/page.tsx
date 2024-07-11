// src/app/page.tsx
"use client";

import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.gradientSection}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Eat Better <br />
            Train Better <br />
            Feel Better
          </h1>
          <div className={styles.buttonContainer}>
            <Link href="/create-nutrition-plan" passHref legacyBehavior>
              <button className={styles.button} data-text="Get personalized diet"></button>
            </Link>
          </div>
        </main>
      </div>
      <div className={styles.whiteSection}>
        <div className={styles.howItWorksContainer}>
          <h3 className={styles.howItWorksTitle}>How it works?</h3>
          <p className={styles.howItWorksText}>Enter your parameters so we can create the <br />
          perfect diet and exercises tailored specifically for you!</p>
        </div>
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.videoCard}`}>
            <h3 className={styles.cardTitle}>Video 1</h3>
            <iframe src="https://www.youtube.com/embed/b73BI9eUkjM?list=RDz9tifvQSu-g&index=10" frameBorder="0" allowFullScreen></iframe>
          </div>
          <div className={`${styles.card} ${styles.videoCard}`}>
            <h3 className={styles.cardTitle}>Video 2</h3>
            <iframe src="https://www.youtube.com/embed/b73BI9eUkjM?list=RDz9tifvQSu-g&index=10" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
        <section>
          <h2 className={styles.subtitle}>Improve while playing</h2>
          <p className={styles.subtitle}>When you complete your daily plans, both you and your mini version improve</p>
        </section>
      </div>
    </div>
  );
}
