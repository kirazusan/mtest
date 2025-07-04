package frontend.components.Calculator;

import React, { useState } from 'react';
import calculatorService from '../../services/calculatorService';

const Calculator = () => {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [operation, setOperation] = useState('add');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (isNaN(number1) || isNaN(number2)) {
            setError('Both inputs must be valid numbers.');
            return;
        }
        try {
            const response = await calculatorService.calculate(number1, number2, operation);
            setResult(response.data.result !== undefined ? response.data.result : 'No result returned');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
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
                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="add">Add</option>
                    <option value="subtract">Subtract</option>
                    <option value="multiply">Multiply</option>
                    <option value="divide">Divide</option>
                </select>
                <button type="submit">Calculate</button>
            </form>
            {result !== null && <div>Result: {result.toLocaleString()}</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default Calculator;