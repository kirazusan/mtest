package frontend;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Calculator from './Calculator';
import ValidationMessage from './ValidationMessage';

const App = () => {
    const [validationMessage, setValidationMessage] = useState('');

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact>
                        <Calculator setValidationMessage={setValidationMessage} />
                        <ValidationMessage message={validationMessage} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;