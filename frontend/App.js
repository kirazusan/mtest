package frontend;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateMauiApp from './CreateMauiApp';
import Calculator from './Calculator';
import InputForm from './InputForm';
import CalculatorInput from './CalculatorInput';

const App = () => {
    const [state, setState] = useState({});

    return (
        <Router>
            <CreateMauiApp>
                <Switch>
                    <Route path="/" exact>
                        <Calculator>
                            <InputForm />
                            <CalculatorInput />
                        </Calculator>
                    </Route>
                </Switch>
            </CreateMauiApp>
        </Router>
    );
};

export default App;