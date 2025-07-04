package frontend.src;

import React, { useEffect, useState } from 'react';
import AppInitializer from './AppInitializer';

const App = () => {
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const response = await fetch('/api/initialize');
                if (!response.ok) {
                    throw new Error('Failed to initialize the application');
                }
                const data = await response.json();
                setInitialized(true);
                setMessage(data.message || 'Application initialized successfully');
            } catch (err) {
                setError(err.message);
            }
        };
        initializeApp();
    }, []);

    return (
        <div>
            {error && <div>Error: {error}</div>}
            {message && <div>{message}</div>}
            {initialized ? <AppInitializer /> : <div>Loading...</div>}
        </div>
    );
};

export default App;