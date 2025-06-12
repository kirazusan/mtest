

import React from 'react';
import ReactDOM from 'react-dom';
import configure from './configure';
import App from './App';

configure().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}).catch((error) => {
  console.error('Error configuring the application:', error);
});