package frontend.components;

import React, { useState } from 'react';
import axios from 'axios';

const DoubleTrimmedDisplay = () => {
    const [doubleValue, setDoubleValue] = useState('');
    const [formatString, setFormatString] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!doubleValue || !formatString) {
            setError('Both fields are required.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/trim', { doubleValue, formatString });
            if (response.data.trimmedString) {
                setResult(response.data.trimmedString);
            } else {
                setError('Unexpected response from server.');
            }
        } catch (error) {
            setError('Error fetching trimmed string.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter double value:
                    <input
                        type="number"
                        value={doubleValue}
                        onChange={(e) => setDoubleValue(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Enter format string:
                    <input
                        type="text"
                        value={formatString}
                        onChange={(e) => setFormatString(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {result && <div>Trimmed Result: {result}</div>}
        </div>
    );
};

export default DoubleTrimmedDisplay;