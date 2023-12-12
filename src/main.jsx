import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ScoresContextProvider } from './store/ScoresContext.jsx';
import './styles/general.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ScoresContextProvider>
      <App />
    </ScoresContextProvider>
  </React.StrictMode>
);
