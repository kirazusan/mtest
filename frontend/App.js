package frontend

import React, { useState, useEffect } from 'react';

const App = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Call backend API to initialize the application
            } catch (err) {
                setError('Failed to initialize the application.');
            }
        };
        initializeApp();
    }, []);

    const handleAddition = () => {
        if (validateInputs()) {
            setResult(Number(num1) + Number(num2));
        }
    };

    const handleSubtraction = () => {
        if (validateInputs()) {
            setResult(Number(num1) - Number(num2));
        }
    };

    const validateInputs = () => {
        if (num1 === '' || num2 === '') {
            setError('Please enter both numbers.');
            setResult(null);
            return false;
        }
        if (isNaN(num1) || isNaN(num2)) {
            setError('Invalid input. Please enter valid numbers.');
            setResult(null);
            return false;
        }
        setError('');
        return true;
    };

    return (
        <div>
            <h1>Calculator</h1>
            <input
                type="number"
                value={num1}
                onChange={(e) => {
                    setNum1(e.target.value);
                    setResult(null);
                }}
            />
            <input
                type="number"
                value={num2}
                onChange={(e) => {
                    setNum2(e.target.value);
                    setResult(null);
                }}
            />
            <button onClick={handleAddition}>Add</button>
            <button onClick={handleSubtraction}>Subtract</button>
            {error && <h2 style={{ color: 'red' }}>{error}</h2>}
            {result !== null && <h2>Result: {result}</h2>}
        </div>
    );
};

export default App;