import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import './globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Clear user session on app startup - requires re-login on each server restart
    localStorage.removeItem('user');
    localStorage.removeItem('sessionId');
  }, []);

  return <Component {...pageProps} />;
}