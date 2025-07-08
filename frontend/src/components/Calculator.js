package frontend.src.components;

import React, { useState } from 'react';
import calculatorService from '../services/calculatorService';

const Calculator = () => {
    const [operand1, setOperand1] = useState('');
    const [operand2, setOperand2] = useState('');
    const [operation, setOperation] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!operand1 || !operand2 || isNaN(operand1) || isNaN(operand2)) {
            setError('Please enter valid numbers for both operands.');
            return;
        }
        if (!['add', 'subtract', 'multiply', 'divide'].includes(operation)) {
            setError('Please select a valid operation.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const calculationResult = await calculatorService.calculate(operand1, operand2, operation);
            setResult(calculationResult);
        } catch (err) {
            setError('Error performing calculation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={operand1}
                    onChange={(e) => setOperand1(e.target.value)}
                    placeholder="Operand 1"
                    required
                />
                <input
                    type="number"
                    value={operand2}
                    onChange={(e) => setOperand2(e.target.value)}
                    placeholder="Operand 2"
                    required
                />
                <select value={operation} onChange={(e) => setOperation(e.target.value)} required>
                    <option value="">Select Operation</option>
                    <option value="add">Add</option>
                    <option value="subtract">Subtract</option>
                    <option value="multiply">Multiply</option>
                    <option value="divide">Divide</option>
                </select>
                <button type="submit" disabled={loading}>Calculate</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {result !== null && <div>Result: {result}</div>}
        </div>
    );
};

export default Calculator;