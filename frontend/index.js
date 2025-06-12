

package.json
{
  "name": "frontend",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "express": "^4.17.1"
  }
}

index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import HelloWorldComponent from './HelloWorldComponent.js';
import HelloWorldService from './HelloWorldService.js';
import express from 'express';

const app = express();

const middlewareDelegate = (req, res, next) => {
  HelloWorldService.handleRequest(req, res, next);
};

const requestPipeline = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(middlewareDelegate);
  app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
};

requestPipeline(app);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

ReactDOM.render(
  <React.StrictMode>
    <App />
    <HelloWorldComponent />
  </React.StrictMode>,
  document.getElementById('root')
);