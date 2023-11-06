import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { AuthContextProvider } from './context/AuthContext';
import { CartSizeContextProvider } from './context/cartSizeContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartSizeContextProvider>
        <GoogleOAuthProvider
          clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
        >
          <App />
        </GoogleOAuthProvider>{' '}
      </CartSizeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
