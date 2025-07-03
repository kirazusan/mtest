package frontend.components;

import React, { useState } from 'react';
import calculatorService from '../services/calculatorService';

const Calculator = () => {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [operator, setOperator] = useState('+');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleCalculation = async () => {
        try {
            const response = await calculatorService.calculate({ number1, number2, operator });
            setResult(response.data.result);
            setError(null);
        } catch (err) {
            setError('Error calculating result. Please try again.');
            setResult(null);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleCalculation(); }}>
                <input
                    type="number"
                    value={number1}
                    onChange={(e) => setNumber1(e.target.value)}
                    placeholder="First Number"
                />
                <input
                    type="number"
                    value={number2}
                    onChange={(e) => setNumber2(e.target.value)}
                    placeholder="Second Number"
                />
                <select value={operator} onChange={(e) => setOperator(e.target.value)}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
                <button type="submit">Calculate</button>
            </form>
            {error && <h2 style={{ color: 'red' }}>{error}</h2>}
            {result !== null && <h2>Result: {result}</h2>}
        </div>
    );
};

export default Calculator;