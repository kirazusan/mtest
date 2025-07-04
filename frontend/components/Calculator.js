package frontend.components;

import React, { useState } from 'react';
import calculatorService from '../services/calculatorService';

const Calculator = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('+');
    const [result, setResult] = useState(null);

    const handleNum1Change = (e) => setNum1(e.target.value);
    const handleNum2Change = (e) => setNum2(e.target.value);
    const handleOperationChange = (e) => setOperation(e.target.value);

    const handleCalculate = async (e) => {
        e.preventDefault();
        const calculationResult = await calculatorService.calculate(num1, num2, operation);
        setResult(calculationResult);
    };

    return (
        <div>
            <form onSubmit={handleCalculate}>
                <input type="number" value={num1} onChange={handleNum1Change} />
                <input type="number" value={num2} onChange={handleNum2Change} />
                <select value={operation} onChange={handleOperationChange}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
                <button type="submit">Calculate</button>
            </form>
            {result !== null && <div>Result: {result}</div>}
            <div>
                {[...Array(10).keys()].map((digit) => (
                    <button key={digit} onClick={() => setNum1(num1 + digit)}>{digit}</button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;