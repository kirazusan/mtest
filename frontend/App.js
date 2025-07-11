package frontend;

import React, { createContext, useReducer } from 'react';
import AppInitializer from './AppInitializer';
import Calculator from './Calculator';

const initialState = {};
const AppContext = createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <Calculator />
        </AppContext.Provider>
    );
};

export default App;