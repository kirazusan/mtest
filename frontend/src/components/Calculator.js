package frontend.src.components;

import React, { useState } from 'react';
import CalculatorService from '../services/CalculatorService';

const Calculator = () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [mathOperator, setMathOperator] = useState('+');
    const [result, setResult] = useState(0);
    const [error, setError] = useState('');

    const handleValue1Change = (e) => {
        setValue1(e.target.value);
    };

    const handleValue2Change = (e) => {
        setValue2(e.target.value);
    };

    const handleOperatorChange = (operator) => {
        setMathOperator(operator);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (value1.trim() === '' || value2.trim() === '' || isNaN(value1) || isNaN(value2)) {
            setError('Please enter valid numbers');
            return;
        }

        try {
            const response = await CalculatorService.calculate(value1, value2, mathOperator);
            setResult(response.data.result);
        } catch (error) {
            setError('Error calculating result');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value1} onChange={handleValue1Change} placeholder="Value 1" />
                <input type="text" value={value2} onChange={handleValue2Change} placeholder="Value 2" />
                <div>
                    <button type="button" onClick={() => handleOperatorChange('+')}>+</button>
                    <button type="button" onClick={() => handleOperatorChange('-')}>-</button>
                    <button type="button" onClick={() => handleOperatorChange('*')}>*</button>
                    <button type="button" onClick={() => handleOperatorChange('/')}>/</button>
                </div>
                <button type="submit">Calculate</button>
            </form>
            {error && <div>{error}</div>}
            {result !== null && <div>Result: {result}</div>}
        </div>
    );
};

export default Calculator;