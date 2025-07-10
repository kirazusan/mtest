package src;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Calculator from './components/Calculator';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Calculator} />
                {/* Additional routes can be added here */}
            </Switch>
        </Router>
    );
}

export default App;