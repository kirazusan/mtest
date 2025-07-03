package src.components;

import React, { useEffect, useState } from 'react';

const AppInitializer = () => {
    const [config, setConfig] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const response = await fetch('/api/CreateMauiApp');
                if (!response.ok) {
                    throw new Error('Failed to initialize the application. Please try again later.');
                }
                const data = await response.json();
                setConfig(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        initializeApp();
    }, []);

    if (loading) {
        return <div>Initializing application, please wait...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <div>App initialized with config: {JSON.stringify(config)}</div>;
};

export default AppInitializer;