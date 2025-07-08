package frontend.components.Calculator;

import React, { useState, useEffect } from 'react';
import calculatorService from '../../services/calculatorService';

const Calculator = () => {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [operator, setOperator] = useState('+');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        initializeCalculator();
    }, []);

    const initializeCalculator = async () => {
        try {
            await calculatorService.initialize();
        } catch (err) {
            setError('Failed to initialize calculator');
        }
    };

    const handleCalculate = async (e) => {
        e.preventDefault();
        try {
            const res = await calculatorService.calculate(number1, number2, operator);
            setResult(res);
            setError('');
        } catch (err) {
            setError('Invalid operation: ' + err.message);
            setResult(null);
        }
    };

    const resetCalculator = async () => {
        try {
            await calculatorService.reset();
            setNumber1('');
            setNumber2('');
            setOperator('+');
            setResult(null);
            setError('');
        } catch (err) {
            setError('Failed to reset calculator');
        }
    };

    const handleTrimmedString = async () => {
        try {
            const res = await calculatorService.calculateTrimmedString(number1, number2);
            setResult(res);
            setError('');
        } catch (err) {
            setError('Error processing trimmed string: ' + err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleCalculate}>
                <input
                    type="number"
                    value={number1}
                    onChange={(e) => setNumber1(e.target.value)}
                />
                <input
                    type="number"
                    value={number2}
                    onChange={(e) => setNumber2(e.target.value)}
                />
                <div>
                    <label>
                        <input
                            type="radio"
                            value="+"
                            checked={operator === '+'}
                            onChange={(e) => setOperator(e.target.value)}
                        />
                        +
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="-"
                            checked={operator === '-'}
                            onChange={(e) => setOperator(e.target.value)}
                        />
                        -
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="*"
                            checked={operator === '*'}
                            onChange={(e) => setOperator(e.target.value)}
                        />
                        *
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="/"
                            checked={operator === '/'}
                            onChange={(e) => setOperator(e.target.value)}
                        />
                        /
                    </label>
                </div>
                <button type="submit">Calculate</button>
                <button type="button" onClick={resetCalculator}>Reset</button>
                <button type="button" onClick={handleTrimmedString}>Calculate Trimmed String</button>
            </form>
            {result !== null && <div>Result: {result}</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default Calculator;