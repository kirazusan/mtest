package src.components.Calculator;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calculator.css';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const response = await axios.get('/api/init');
                if (response.data.initialInput) {
                    setInput(response.data.initialInput);
                } else {
                    setError('Initialization error: No initial input provided.');
                }
            } catch (error) {
                setError('Error initializing app: ' + error.message);
            }
        };
        initializeApp();
    }, []);

    const handleButtonClick = (value) => {
        setInput((prev) => prev + value);
        setError('');
    };

    const handleCalculate = async () => {
        if (!input) {
            setError('Input cannot be empty.');
            return;
        }
        try {
            const response = await axios.post('/api/calculate', { input });
            setResult(response.data.result);
        } catch (error) {
            setError('Error calculating result: ' + error.message);
        }
    };

    const handleClear = () => {
        setInput('');
        setResult('');
        setError('');
    };

    return (
        <div className="calculator">
            <div className="display">
                <input type="text" value={input} readOnly />
                <button onClick={handleClear}>C</button>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="buttons">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                    <button key={num} onClick={() => handleButtonClick(num.toString())}>
                        {num}
                    </button>
                ))}
                {['+', '-', '*', '/'].map((op) => (
                    <button key={op} onClick={() => handleButtonClick(op)}>
                        {op}
                    </button>
                ))}
                <button onClick={handleCalculate}>=</button>
            </div>
            <div className="result">
                <h2>Result: {result}</h2>
            </div>
        </div>
    );
};

export default Calculator;