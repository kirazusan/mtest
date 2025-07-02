package frontend.components;

import React, { useState } from 'react';
import axios from 'axios';

const CalculatorInput = () => {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [operation, setOperation] = useState('addition');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/validate', { number1, number2, operation });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error validating inputs.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={number1}
                onChange={(e) => setNumber1(e.target.value)}
                placeholder="Enter first number"
            />
            <input
                type="text"
                value={number2}
                onChange={(e) => setNumber2(e.target.value)}
                placeholder="Enter second number"
            />
            <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                <option value="addition">Addition</option>
                <option value="subtraction">Subtraction</option>
                <option value="multiplication">Multiplication</option>
                <option value="division">Division</option>
            </select>
            <button type="submit">Calculate</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default CalculatorInput;