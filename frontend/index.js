

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Application from './Application';
import ApplicationConfigurator from './ApplicationConfigurator';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<App />, rootElement);
}

const applicationConfigurator = new ApplicationConfigurator();
applicationConfigurator.configure();

const application = new Application();
application.render();