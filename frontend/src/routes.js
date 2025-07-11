import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Calculator from './components/Calculator';
import NumberFormatter from './components/NumberFormatter';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" component={App} exact />
            <Route path="/calculator" component={Calculator} />
            <Route path="/number-formatter" component={NumberFormatter} />
        </Switch>
    </Router>
);

export default Routes;