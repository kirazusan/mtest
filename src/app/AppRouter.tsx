import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';

const AppRouter = () => (
  <Router>
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} component={route.component} />
      ))}
    </Switch>
  </Router>
);

export default AppRouter;