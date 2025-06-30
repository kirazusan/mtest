

import React, { useState } from 'react';
import CalculatorService from '../services/CalculatorService';

const CalculatorComponent = () => {
    const [calculationResult, setCalculationResult] = useState('');
    const [currentEntry, setCurrentEntry] = useState('');
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);
    const [currentState, setCurrentState] = useState(0);

    const handleCalculate = async () => {
        if (currentState !== 2) return;

        try {
            const result = await CalculatorService.calculate(firstNumber, secondNumber);
            setCalculationResult(result);

            setFirstNumber(result);
            setSecondNumber(0);
            setCurrentState(-1);
            setCurrentEntry('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleNumberClick = (number) => {
        if (currentState === 0) {
            setFirstNumber(number);
            setCurrentState(1);
        } else if (currentState === 1) {
            setSecondNumber(number);
            setCurrentState(2);
        }

        setCurrentEntry(`${currentEntry}${number}`);
    };

    const handleOperatorClick = (operator) => {
        if (currentState === 1) {
            setCurrentState(0);
            setCurrentEntry(`${currentEntry}${operator}`);
        }
    };

    return (
        <div>
            <h1>Calculator</h1>
            <input type="text" value={currentEntry} readOnly />
            <button onClick={handleCalculate}>Calculate</button>
            <button onClick={() => handleNumberClick(1)}>1</button>
            <button onClick={() => handleNumberClick(2)}>2</button>
            <button onClick={() => handleNumberClick(3)}>3</button>
            <button onClick={() => handleOperatorClick('+')}>+</button>
            <button onClick={() => handleNumberClick(4)}>4</button>
            <button onClick={() => handleNumberClick(5)}>5</button>
            <button onClick={() => handleNumberClick(6)}>6</button>
            <button onClick={() => handleOperatorClick('-')}>-</button>
            <button onClick={() => handleNumberClick(7)}>7</button>
            <button onClick={() => handleNumberClick(8)}>8</button>
            <button onClick={() => handleNumberClick(9)}>9</button>
            <button onClick={() => handleOperatorClick('*')}>*</button>
            <button onClick={() => handleNumberClick(0)}>0</button>
            <button onClick={() => handleOperatorClick('/')}>/</button>
            <p>Result: {calculationResult}</p>
        </div>
    );
};

export default CalculatorComponent;