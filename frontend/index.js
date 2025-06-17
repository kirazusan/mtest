

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
} else {
  throw new Error('Failed to find the root element');
}