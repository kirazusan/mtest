import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';

const MainApplication = () => {
  return (
    <Router>
      <Route path="/" component={MainPage} />
    </Router>
  );
};

export default MainApplication;