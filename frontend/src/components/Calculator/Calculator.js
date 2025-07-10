package frontend.src.components.Calculator;

import React, { useState } from 'react';
import apiService from '../../services/apiService';

const Calculator = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleCalculation = async (operation) => {
        if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
            setError('Please enter valid numbers');
            return;
        }
        setError('');
        try {
            const response = await apiService.calculate(num1, num2, operation);
            setResult(response.data.result);
        } catch (err) {
            setError('Calculation error. Please try again.');
        }
    };

    return (
        <div>
            <label>
                Number 1:
                <input 
                    type="number" 
                    value={num1} 
                    onChange={(e) => setNum1(e.target.value)} 
                    aria-label="Number 1"
                />
            </label>
            <label>
                Number 2:
                <input 
                    type="number" 
                    value={num2} 
                    onChange={(e) => setNum2(e.target.value)} 
                    aria-label="Number 2"
                />
            </label>
            <button onClick={() => handleCalculation('add')}>+</button>
            <button onClick={() => handleCalculation('subtract')}>-</button>
            <button onClick={() => handleCalculation('multiply')}>*</button>
            <button onClick={() => handleCalculation('divide')}>/</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>Result: {result}</div>
        </div>
    );
};

export default Calculator;