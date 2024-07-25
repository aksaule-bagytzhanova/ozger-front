// src/app/layout.tsx
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Ozger AI',
  description: 'Nutrition and workouts on one platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-container">
          <Header />
          <main className="content-wrap">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
