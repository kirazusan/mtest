package frontend.components;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppInitializer = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const response = await axios.post('/api/CreateMauiApp');
                if (response.status !== 200) {
                    setError(`Error: ${response.data.message || 'Failed to initialize the application.'}`);
                }
            } catch (err) {
                setError(`Network Error: ${err.message || 'Failed to initialize the application.'}`);
            } finally {
                setLoading(false);
            }
        };
        initializeApp();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Application Initialized Successfully!</div>;
};

export default AppInitializer;