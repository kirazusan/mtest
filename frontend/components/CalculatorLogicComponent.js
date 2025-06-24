

import React, { useState } from 'react';

const CalculatorLogicComponent = (props) => {
    const [result, setResult] = useState(0);
    const [error, setError] = useState(null);

    const handleCalculate = () => {
        const { firstNumber, secondNumber, mathOperator } = props;

        if (!firstNumber || !secondNumber || !mathOperator) {
            setError('Please provide all required inputs');
            return;
        }

        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            setError('Inputs must be numbers');
            return;
        }

        if (!['+', '-', '*', '/'].includes(mathOperator)) {
            setError('Invalid math operator');
            return;
        }

        switch (mathOperator) {
            case '+':
                setResult(firstNumber + secondNumber);
                break;
            case '-':
                setResult(firstNumber - secondNumber);
                break;
            case '*':
                setResult(firstNumber * secondNumber);
                break;
            case '/':
                if (secondNumber === 0) {
                    setError('Cannot divide by zero');
                    return;
                }
                setResult(firstNumber / secondNumber);
                break;
            default:
                setResult(0);
        }
    };

    return (
        <div>
            <button onClick={handleCalculate}>Calculate</button>
            {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
                <p>Result: {result}</p>
            )}
        </div>
    );
};

export default CalculatorLogicComponent;