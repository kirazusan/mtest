package frontend.components;

import React, { useState } from 'react';
import axios from 'axios';

const NumberFormatter = () => {
    const [inputValue, setInputValue] = useState('');
    const [decimalFormat, setDecimalFormat] = useState('');
    const [formattedResult, setFormattedResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFormatChange = (e) => {
        setDecimalFormat(e.target.value);
    };

    const formatNumber = async () => {
        if (isNaN(inputValue) || !decimalFormat) {
            setError('Please enter a valid double value and decimal format.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('/api/format', {
                value: parseFloat(inputValue),
                format: decimalFormat
            });
            setFormattedResult(response.data.result);
        } catch (error) {
            setError('Error formatting number. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <label>
                Double Value:
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter a double value"
                />
            </label>
            <label>
                Decimal Format:
                <input
                    type="text"
                    value={decimalFormat}
                    onChange={handleFormatChange}
                    placeholder="Enter decimal format"
                />
            </label>
            <button onClick={formatNumber} disabled={loading}>
                {loading ? 'Formatting...' : 'Format Number'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <strong>Formatted Result:</strong> {formattedResult}
            </div>
        </div>
    );
};

export default NumberFormatter;