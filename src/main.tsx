import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Catch and log errors globally
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Get the root element
const rootElement = document.getElementById("root");

// Make sure the element exists before rendering
if (rootElement) {
  const root = createRoot(rootElement);
  
  // Disable strict mode in production for better performance
  // but keep it in development for better debugging
  const isProduction = import.meta.env.PROD;
  
  const AppWithMode = isProduction 
    ? <App />
    : <React.StrictMode><App /></React.StrictMode>;
  
  // Render the app
  root.render(AppWithMode);
}
