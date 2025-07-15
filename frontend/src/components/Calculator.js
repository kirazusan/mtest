package src.components;

import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Calculator = () => {
    const [doubleValue, setDoubleValue] = useState('');
    const [formatString, setFormatString] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isNaN(doubleValue) || doubleValue === '') {
            setError('Please enter a valid double value.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('/api/calculate/trimmed', {
                doubleValue,
                formatString
            });
            setResult(response.data.trimmedString || 'No result returned');
        } catch (error) {
            setError('Error fetching result. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={doubleValue}
                onChange={(e) => setDoubleValue(e.target.value)}
                placeholder="Enter double value"
                required
            />
            <input
                type="text"
                value={formatString}
                onChange={(e) => setFormatString(e.target.value)}
                placeholder="Enter format string"
                required
            />
            <button type="submit" disabled={loading}>Calculate</button>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {result && <div>Result: {result}</div>}
        </form>
    );
};

Calculator.propTypes = {
    doubleValue: PropTypes.string,
    formatString: PropTypes.string,
    result: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string
};

export default Calculator;