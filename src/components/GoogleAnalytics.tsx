'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const GoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', 'G-BS8124XWD9', {
        page_path: url,
      });
    };
    handleRouteChange(pathname);
  }, [pathname]);

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-BS8124XWD9`}
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BS8124XWD9', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
