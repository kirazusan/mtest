package src.components;

import React, { useEffect, useState } from 'react';

const AppInitializer = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const response = await fetch('/api/initialize');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                if (err.name === 'TypeError') {
                    setError(new Error('Backend service is unreachable. Please try again later.'));
                } else {
                    setError(err);
                }
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
        return <div>Error: {error.message}</div>;
    }

    return <div>Initialization successful: {JSON.stringify(data)}</div>;
};

export default AppInitializer;