package frontend.src.components.Calculator;

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
                setInput(response.data.initialInput);
            } catch (error) {
                setError('Error initializing the app');
            }
        };
        initializeApp();
    }, []);

    const handleButtonClick = (value) => {
        setInput((prevInput) => prevInput + value);
        setError('');
    };

    const calculateResult = async () => {
        try {
            const response = await axios.post('/api/calculate', { input });
            setResult(response.data.result);
        } catch (error) {
            setError('Error calculating result');
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
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button onClick={() => handleButtonClick('+')}>+</button>
            </div>
            <div className="buttons">
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button onClick={() => handleButtonClick('-')}>-</button>
            </div>
            <div className="buttons">
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button onClick={() => handleButtonClick('*')}>*</button>
            </div>
            <div className="buttons">
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={calculateResult}>=</button>
                <button onClick={() => handleButtonClick('/')}>/</button>
            </div>
            <div className="result">
                <h2>Result: {result}</h2>
            </div>
        </div>
    );
};

export default Calculator;