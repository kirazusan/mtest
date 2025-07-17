import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage.js';

const Routes = () => (
  <Switch>
    <Route path="/" component={MainPage} />
  </Switch>
);

export default Routes;