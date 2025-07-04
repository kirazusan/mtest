package frontend.components;

import React, { useState } from 'react';
import axios from 'axios';

const PercentageCalculator = () => {
    const [number, setNumber] = useState('');
    const [percentage, setPercentage] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResult(null);
        if (isNaN(number) || isNaN(percentage) || number < 0 || percentage < 0 || percentage > 100) {
            setError('Please enter valid numbers. Percentage must be between 0 and 100.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('/api/calculate', { number, percentage });
            if (response.data && response.data.result !== undefined) {
                setResult(response.data.result);
            } else {
                setError('Unexpected response format from the server.');
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error calculating percentage. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Number:
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Enter number"
                        required
                    />
                </label>
                <label>
                    Percentage:
                    <input
                        type="number"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        placeholder="Enter percentage"
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>{loading ? 'Calculating...' : 'Calculate'}</button>
            </form>
            {result !== null && <div>Result: {result}</div>}
            {error && <div>{error}</div>}
        </div>
    );
};

export default PercentageCalculator;