package frontend.src.components;

import React, { useState, useEffect } from 'react';
import Routes from './routes';

const App = () => {
    const [currentInput, setCurrentInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch initial data if necessary
    }, []);

    const handleButtonClick = (value) => {
        setCurrentInput((prev) => prev + value);
    };

    const handleOperation = (operation) => {
        if (currentInput) {
            calculate(operation);
        }
    };

    const calculate = async (operation) => {
        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: currentInput, operation }),
            });
            const data = await response.json();
            setResult(data.result);
        } catch (err) {
            setError('Error calculating result');
        }
    };

    const renderButtons = () => {
        const buttons = [];
        for (let i = 0; i <= 9; i++) {
            buttons.push(<button key={i} onClick={() => handleButtonClick(i.toString())}>{i}</button>);
        }
        const operations = ['+', '-', '*', '/'];
        operations.forEach(op => {
            buttons.push(<button key={op} onClick={() => handleOperation(op)}>{op}</button>);
        });
        return buttons;
    };

    return (
        <div>
            <div>
                <input type="text" value={currentInput} readOnly />
                <div>{result}</div>
                {error && <div>{error}</div>}
            </div>
            <div>
                {renderButtons()}
            </div>
            <button onClick={() => calculate()}>Calculate</button>
        </div>
    );
};

export default App;