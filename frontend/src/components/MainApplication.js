package frontend.src.components;

import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';

const MainApplication = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const response = await apiService.initialize();
                setData(response.data);
            } catch (err) {
                setError({ message: 'Failed to initialize the application. Please try again later.' });
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

    return (
        <div>
            <h1>Main Application</h1>
            {/* Render application UI using data */}
            {data && <div>{JSON.stringify(data)}</div>}
        </div>
    );
};

export default MainApplication;