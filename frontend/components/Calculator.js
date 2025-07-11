package frontend.components;

import React, { useState } from 'react';
import calculatorService from '../services/calculatorService';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleNumberClick = (number) => {
        setInput(input + number);
    };

    const handleOperatorClick = (operator) => {
        if (input) {
            calculatorService.calculate(input, operator)
                .then(res => {
                    setResult(res);
                    setInput('');
                })
                .catch(err => {
                    setError(err.message);
                });
        } else {
            setError('Input cannot be empty');
        }
    };

    const handleEqualsClick = () => {
        if (input) {
            calculatorService.calculate(input, '=')
                .then(res => {
                    setResult(res);
                    setInput('');
                })
                .catch(err => {
                    setError(err.message);
                });
        } else {
            setError('Input cannot be empty');
        }
    };

    return (
        <div>
            <Display result={result} error={error} />
            <div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                    <Button key={num} onClick={() => handleNumberClick(num)}>{num}</Button>
                ))}
                {['+', '-', '*', '/'].map(op => (
                    <Button key={op} onClick={() => handleOperatorClick(op)}>{op}</Button>
                ))}
                <Button onClick={handleEqualsClick}>=</Button>
            </div>
        </div>
    );
};

export default Calculator;