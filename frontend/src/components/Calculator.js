package frontend.src.components;

import React, { useState } from 'react';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [operator, setOperator] = useState(null);
    const [history, setHistory] = useState([]);

    const handleButtonClick = (value) => {
        if (['+', '-', '*', '/', '%', '×', '÷'].includes(value)) {
            setOperator(value);
            setResult(input);
            setInput('');
        } else if (value === '=') {
            calculateResult();
        } else if (value === 'C') {
            clearInput();
        } else if (value === '←') {
            setInput(input.slice(0, -1));
        } else {
            setInput(input + value);
        }
    };

    const calculateResult = () => {
        if (result !== null && operator && input) {
            const firstValue = parseFloat(result);
            const secondValue = parseFloat(input);
            let calculation;

            if (operator === '/' && secondValue === 0) {
                alert("Cannot divide by zero");
                return;
            }

            switch (operator) {
                case '+':
                    calculation = firstValue + secondValue;
                    break;
                case '-':
                    calculation = firstValue - secondValue;
                    break;
                case '*':
                case '×':
                    calculation = firstValue * secondValue;
                    break;
                case '/':
                case '÷':
                    calculation = firstValue / secondValue;
                    break;
                case '%':
                    calculation = firstValue % secondValue;
                    break;
                default:
                    break;
            }
            setHistory([...history, `${firstValue} ${operator} ${secondValue} = ${calculation}`]);
            setResult(calculation);
            setInput('');
            setOperator(null);
        }
    };

    const clearInput = () => {
        setInput('');
        setResult(null);
        setOperator(null);
    };

    return (
        <div>
            <div>
                <input type="text" value={input} readOnly />
                <div>{result !== null ? result : ''}</div>
            </div>
            <div>
                <button onClick={() => handleButtonClick('C')}>C</button>
                <button onClick={() => handleButtonClick('←')}>←</button>
                {[...Array(10).keys()].map(num => (
                    <button key={num} onClick={() => handleButtonClick(num.toString())}>{num}</button>
                ))}
                {['+', '-', '*', '/', '%', '×', '÷', '=', 'History'].map(op => (
                    <button key={op} onClick={() => handleButtonClick(op)}>{op}</button>
                ))}
            </div>
            <div>
                <h3>History</h3>
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>{entry}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Calculator;