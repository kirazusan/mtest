package src.routes;

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPageComponent from './components/main-page/main-page.component';
import CalculatorComponent from './components/Calculator/Calculator';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={MainPageComponent} />
            <Route path="/calculator" component={CalculatorComponent} />
        </Switch>
    </Router>
);

export default Routes;