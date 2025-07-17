import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CalculatorMainPage from './components/CalculatorMainPage/CalculatorMainPage';

const App = () => {
  return (
    <Router>
      <Route path="/calculator" component={CalculatorMainPage} />
    </Router>
  );
};

export default App;