package;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPageComponent from './components/main-page/main-page.component';
import Calculator from './components/Calculator/Calculator';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={MainPageComponent} />
            <Route path="/calculator" component={Calculator} />
        </Switch>
    </Router>
);

export default Routes;