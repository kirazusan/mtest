package frontend.src;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Calculator from './Calculator';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Calculator} />
                <Route path="/calculator" component={Calculator} />
                {/* Additional routes can be added here in the future */}
            </Switch>
        </Router>
    );
}

export default App;