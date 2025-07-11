package frontend.components.Calculator;

import React, { useState } from 'react';
import calculatorService from '../../services/calculatorService';

const Calculator = () => {
    const [doubleValue, setDoubleValue] = useState('');
    const [formatString, setFormatString] = useState('');
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [mathOperator, setMathOperator] = useState('+');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (!doubleValue || !formatString || !value1 || !value2) {
                throw new Error('All fields are required.');
            }
            const trimmedResult = await calculatorService.trimString(doubleValue, formatString);
            const calculationResult = calculate(value1, value2, mathOperator);
            setResult({ trimmedResult, calculationResult });
        } catch (err) {
            setError(err.message || 'An error occurred while processing your request.');
        }
    };

    const calculate = (num1, num2, operator) => {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        switch (operator) {
            case '+':
                return n1 + n2;
            case '-':
                return n1 - n2;
            case '×':
                return n1 * n2;
            case '÷':
                return n2 !== 0 ? n1 / n2 : 'Cannot divide by zero';
            default:
                return null;
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={doubleValue}
                    onChange={(e) => setDoubleValue(e.target.value)}
                    placeholder="Double Value"
                />
                <input
                    type="text"
                    value={formatString}
                    onChange={(e) => setFormatString(e.target.value)}
                    placeholder="Format String"
                />
                <input
                    type="text"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    placeholder="Value 1"
                />
                <input
                    type="text"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    placeholder="Value 2"
                />
                <select onChange={(e) => setMathOperator(e.target.value)} value={mathOperator}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="×">×</option>
                    <option value="÷">÷</option>
                </select>
                <button type="submit">Calculate</button>
            </form>
            {error && <div>{error}</div>}
            {result && (
                <div>
                    <div>Trimmed Result: {result.trimmedResult}</div>
                    <div>Calculation Result: {result.calculationResult}</div>
                </div>
            )}
        </div>
    );
};

export default Calculator;