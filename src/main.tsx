
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import './index.css';

// Use createRoot API for better Concurrent Mode support
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  
  // Use production mode rendering for better performance
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
