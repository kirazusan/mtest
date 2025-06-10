

import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/Index';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

try {
  ReactDOM.render(
    <React.StrictMode>
      <Index />
    </React.StrictMode>,
    rootElement
  );
} catch (error) {
  console.error('Error rendering the Index component:', error);
}