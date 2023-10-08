import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './style/style.css';
import './style/login.css';
import './style/signup.css';
import { AuthContextProvider } from './context/AuthContext';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
