

import React, { useState, useEffect } from 'react';
import resetCurrentEntryService from '../services/resetCurrentEntryService';

const ResetCurrentEntryComponent = () => {
    const [currentEntry, setCurrentEntry] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const resetCurrentEntry = async () => {
        setLoading(true);
        try {
            const response = await resetCurrentEntryService();
            if (response.status === 200) {
                setCurrentEntry(response.data);
            } else {
                setError(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentEntry === '') {
            setError('Initial state is empty');
        }
        if (typeof currentEntry !== 'string') {
            setError('Invalid type for currentEntry');
        }
    }, [currentEntry]);

    return (
        <div>
            <button onClick={resetCurrentEntry} disabled={loading}>
                Reset Current Entry
            </button>
            {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
                <p>Current Entry: {currentEntry}</p>
            )}
        </div>
    );
};

export default ResetCurrentEntryComponent;