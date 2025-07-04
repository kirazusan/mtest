package frontend;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Calculator from './Calculator';
import NumberFormatter from './NumberFormatter';
import PercentageCalculator from './PercentageCalculator';

function App() {
    const [result, setResult] = useState('');

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact>
                        <Calculator setResult={setResult} />
                        <NumberFormatter result={result} />
                        <PercentageCalculator setResult={setResult} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;