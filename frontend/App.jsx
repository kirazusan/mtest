package frontend;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NegateNumberForm from './NegateNumberForm';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <NegateNumberForm />
                </Route>
                {/* Future components can be added here */}
            </Switch>
        </Router>
    );
};

export default App;