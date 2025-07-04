package frontend.components;

import React, { useState } from 'react';
import axios from 'axios';

const NegateNumberForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setError('');
    };

    const handleNegate = async () => {
        const number = parseFloat(inputValue);
        if (isNaN(number)) {
            setError('Please enter a valid number');
            return;
        }
        try {
            const response = await axios.post('/api/negate', { number });
            setResult(response.data.result);
        } catch (err) {
            setError('An error occurred while negating the number. Please try again.');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter a number"
                aria-label="Number input"
            />
            <button onClick={handleNegate} aria-label="Negate button">Negate</button>
            {result !== null && <div>Result: {result}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default NegateNumberForm;