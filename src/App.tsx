import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CalculationDisplay from './components/MainPage/CalculationDisplay';
import ControlButtons from './components/MainPage/ControlButtons';

const App = () => {
  return (
    <Switch>
      <Route path="/calculation" component={CalculationDisplay} />
      <Route path="/control" component={ControlButtons} />
    </Switch>
  );
};

export default App;