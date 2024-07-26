import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Ozger AI',
  description: 'Nutrition and workouts on one platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
