package frontend.src;

import React, { useState, useEffect } from 'react';
import AppInitializer from './AppInitializer';

const App = () => {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        const initializeConfig = async () => {
            const initialConfig = AppInitializer();
            setConfig(initialConfig);
        };
        initializeConfig();
    }, []);

    return (
        <div>
            {config ? (
                <h1>Application Initialized with Config: {JSON.stringify(config)}</h1>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default App;