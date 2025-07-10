package frontend.components;

import React, { useState } from 'react';

const Calculator = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const validateInputs = () => {
        if (isNaN(num1) || isNaN(num2) || num1 === '' || num2 === '') {
            setError('Please enter valid numbers');
            return false;
        }
        setError('');
        return true;
    };

    const handleCalculation = () => {
        if (!validateInputs()) return;
        let res;
        const number1 = parseFloat(num1);
        const number2 = parseFloat(num2);
        switch (operation) {
            case 'add':
                res = number1 + number2;
                break;
            case 'subtract':
                res = number1 - number2;
                break;
            case 'multiply':
                res = number1 * number2;
                break;
            case 'divide':
                res = number2 !== 0 ? number1 / number2 : 'Error: Division by zero';
                break;
            default:
                res = 'Select an operation';
        }
        setResult(res);
    };

    return (
        <div>
            <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
            />
            <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
            />
            <div>
                <button onClick={() => { setOperation('add'); handleCalculation(); }}>+</button>
                <button onClick={() => { setOperation('subtract'); handleCalculation(); }}>-</button>
                <button onClick={() => { setOperation('multiply'); handleCalculation(); }}>*</button>
                <button onClick={() => { setOperation('divide'); handleCalculation(); }}>/</button>
            </div>
            <div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                Result: {result}
            </div>
        </div>
    );
};

export default Calculator;