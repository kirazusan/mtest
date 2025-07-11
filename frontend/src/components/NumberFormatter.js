package frontend.src.components;

import React, { useState } from 'react';
import NumberFormatterService from '../services/NumberFormatterService';

const NumberFormatter = () => {
    const [number, setNumber] = useState('');
    const [format, setFormat] = useState('');
    const [formattedString, setFormattedString] = useState('');
    const [error, setError] = useState('');

    const handleFormat = async (e) => {
        e.preventDefault();
        setError('');
        if (isNaN(number) || !format) {
            setError('Invalid input: Please enter a valid number and format.');
            return;
        }
        try {
            const response = await fetch('/api/format', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ number: parseFloat(number), format }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFormattedString(data.formattedString);
        } catch (err) {
            setError(`Error formatting number: ${err.message}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleFormat}>
                <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Enter a double value"
                />
                <input
                    type="text"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    placeholder="Enter decimal format"
                />
                <button type="submit">Format</button>
            </form>
            {error && <div>{error}</div>}
            {formattedString && <div>Formatted String: {formattedString}</div>}
        </div>
    );
};

export default NumberFormatter;