import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { AppService } from '/src/app/services/AppService';

const initializeApp = async () => {
  await AppService.CreateMauiApp();
  ReactDOM.render(<AppRouter />, document.getElementById('root'));
};

initializeApp();