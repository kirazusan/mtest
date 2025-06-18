

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

if (typeof App !== 'function') {
  throw new Error('App component is not properly exported');
}

let hasRendered = false;

if (!hasRendered) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
  hasRendered = true;
}