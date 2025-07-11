package frontend.components;

import React, { useEffect, useState } from 'react';

const AppInitializer = () => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('/api/config');
                if (!response.ok) {
                    throw new Error('Failed to fetch configuration. Please try again later.');
                }
                const data = await response.json();
                if (!data) {
                    throw new Error('Configuration not received.');
                }
                setConfig(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Application Initialized</h1>
            <pre>{JSON.stringify(config, null, 2)}</pre>
        </div>
    );
};

export default AppInitializer;