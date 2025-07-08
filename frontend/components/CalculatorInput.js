package frontend.components;

import React, { useState } from 'react';
import { validateInput } from '../services/calculatorService';

const CalculatorInput = () => {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [operator, setOperator] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await validateInput({ number1, number2, operator });
        if (response.validationMessage) {
            setValidationMessage(response.validationMessage);
        } else {
            setValidationMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={number1}
                onChange={(e) => setNumber1(e.target.value)}
                placeholder="Number 1"
                required
            />
            <input
                type="number"
                value={number2}
                onChange={(e) => setNumber2(e.target.value)}
                placeholder="Number 2"
                required
            />
            <input
                type="text"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                placeholder="Operator"
                required
            />
            <button type="submit">Calculate</button>
            {validationMessage && <p>{validationMessage}</p>}
        </form>
    );
};

export default CalculatorInput;