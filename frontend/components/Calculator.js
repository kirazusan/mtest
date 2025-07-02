package frontend.components;

import React, { useState } from 'react';

const Calculator = ({ onSuccess, onError }) => {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [operation, setOperation] = useState('addition');
    const [result, setResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const calculate = () => {
        const num1 = parseFloat(number1);
        const num2 = parseFloat(number2);
        setErrorMessage('');

        if (isNaN(num1) || isNaN(num2)) {
            setErrorMessage('Invalid input. Please enter valid numbers.');
            onError('Invalid input');
            return;
        }

        let res;
        switch (operation) {
            case 'addition':
                res = num1 + num2;
                break;
            case 'subtraction':
                res = num1 - num2;
                break;
            case 'multiplication':
                res = num1 * num2;
                break;
            case 'division':
                if (num2 === 0) {
                    setErrorMessage('Division by zero is not allowed.');
                    onError('Division by zero');
                    return;
                }
                res = num1 / num2;
                break;
            default:
                setErrorMessage('Invalid operation selected.');
                onError('Invalid operation');
                return;
        }

        setResult(res);
        onSuccess(res);
    };

    return (
        <div>
            <input
                type="text"
                value={number1}
                onChange={(e) => setNumber1(e.target.value)}
                placeholder="Number 1"
            />
            <input
                type="text"
                value={number2}
                onChange={(e) => setNumber2(e.target.value)}
                placeholder="Number 2"
            />
            <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                <option value="addition">Addition</option>
                <option value="subtraction">Subtraction</option>
                <option value="multiplication">Multiplication</option>
                <option value="division">Division</option>
            </select>
            <button onClick={calculate}>Calculate</button>
            {result && <div>Result: {result}</div>}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
};

export default Calculator;