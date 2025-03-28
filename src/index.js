import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from "./Redux/Store"
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="753904239312-t30skumkbkbu4rd78bcsshd7f7od1rt3.apps.googleusercontent.com ">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>
);
