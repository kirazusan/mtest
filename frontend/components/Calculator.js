package frontend.components;

import React, { useState } from 'react';
import axios from 'axios';

const Calculator = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('add');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!num1 || !num2) {
            setError('Please enter both numbers');
            return;
        }
        try {
            const response = await axios.post('/api/calculate', { num1, num2, operation });
            setResult(response.data.result);
        } catch (err) {
            setError('Error performing calculation');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    placeholder="First Number"
                />
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    placeholder="Second Number"
                />
                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="add">Add</option>
                    <option value="subtract">Subtract</option>
                    <option value="multiply">Multiply</option>
                    <option value="divide">Divide</option>
                </select>
                <button type="submit">Calculate</button>
            </form>
            {result !== null && <div>Result: {result}</div>}
            {error && <div>{error}</div>}
        </div>
    );
};

export default Calculator;