import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import config from './config';
import 'tailwindcss/tailwind.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
