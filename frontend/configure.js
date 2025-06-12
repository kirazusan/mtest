

import React from 'react';
import ReactDOM from 'react-dom';
import ConfigureComponent from './ConfigureComponent';

const renderConfigureComponent = () => {
  const rootElement = document.getElementById('configure-root');
  if (!rootElement) {
    throw new Error('Configure root element not found');
  }
  return ReactDOM.render(<ConfigureComponent />, rootElement);
};

const configure = () => {
  return new Promise((resolve, reject) => {
    try {
      renderConfigureComponent();
      resolve();
    } catch (error) {
      console.error('Error rendering ConfigureComponent:', error);
      reject(error);
    }
  });
};

export { configure };