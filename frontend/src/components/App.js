package src.components;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainApplication from './MainApplication';
import Calculator from './Calculator';
import axios from 'axios';

const App = () => {
    const [config, setConfig] = useState(null);
    const [initialState, setInitialState] = useState({});

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get('/api/config');
                setConfig(response.data);
                setInitialState(response.data.initialState || {});
            } catch (error) {
                console.error('Error fetching configuration:', error);
            }
        };
        fetchConfig();
    }, []);

    return (
        <Router>
            <MainApplication initialState={initialState}>
                <Switch>
                    <Route path="/" exact>
                        <Calculator config={config} />
                    </Route>
                </Switch>
            </MainApplication>
        </Router>
    );
};

export default App;