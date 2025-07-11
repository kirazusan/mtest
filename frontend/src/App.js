package frontend.src;

import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import Calculator from './Calculator';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <AppContext.Provider value={{ errorMessage, setErrorMessage }}>
            {children}
        </AppContext.Provider>
    );
};

const App = () => {
    return (
        <AppProvider>
            <div>
                <Calculator />
            </div>
        </AppProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));