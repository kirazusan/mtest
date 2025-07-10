package frontend.components;

import React, { useState } from 'react';

const NumberFormatter = () => {
    const [number, setNumber] = useState('');
    const [decimalFormat, setDecimalFormat] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    };

    const handleDecimalFormatChange = (e) => {
        setDecimalFormat(e.target.value);
    };

    const formatNumber = async () => {
        if (!decimalFormat.match(/^\d+(\.\d+)?$/)) {
            setError('Invalid decimal format');
            return;
        }
        setError('');
        const response = await fetch('/api/format-number', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number, decimalFormat }),
        });
        if (!response.ok) {
            setError('Error formatting number');
            return;
        }
        const data = await response.json();
        setResult(data.trimmedString);
    };

    return (
        <div>
            <label>
                Enter a number:
                <input
                    type="text"
                    value={number}
                    onChange={handleNumberChange}
                    aria-label="Number input"
                />
            </label>
            <label>
                Select decimal format:
                <select value={decimalFormat} onChange={handleDecimalFormatChange} aria-label="Decimal format select">
                    <option value="">Select format</option>
                    <option value="1">1</option>
                    <option value="1.0">1.0</option>
                    <option value="1.00">1.00</option>
                </select>
            </label>
            <button onClick={formatNumber}>Format Number</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>{result}</div>
        </div>
    );
};

export default NumberFormatter;