

import React from 'react';
import ReactDOM from 'react-dom';
import MauiApp from './MauiApp';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    {process.env.REACT_APP_ENV === 'maui' ? <MauiApp /> : <App />}
  </React.StrictMode>,
  document.getElementById('root')
);