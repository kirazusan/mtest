package frontend.src;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Calculator from './Calculator';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Calculator} />
            </Switch>
        </Router>
    );
}

export default App;