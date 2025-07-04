package frontend.components;

import React, { useState } from 'react';

const App = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange1 = (e) => {
        setInput1(e.target.value);
    };

    const handleInputChange2 = (e) => {
        setInput2(e.target.value);
    };

    const validateInputs = () => {
        return !isNaN(input1) && !isNaN(input2) && input1 !== '' && input2 !== '';
    };

    const calculateResult = async (operation) => {
        if (!validateInputs()) {
            setError('Please enter valid numbers.');
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input1: Number(input1), input2: Number(input2), operation }),
            });
            const data = await response.json();
            if (data.result !== undefined) {
                setResult(data.result);
            } else {
                setError('Invalid response from server.');
            }
        } catch (err) {
            setError('Error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="number" value={input1} onChange={handleInputChange1} />
            <input type="number" value={input2} onChange={handleInputChange2} />
            <button onClick={() => calculateResult('add')}>Add</button>
            <button onClick={() => calculateResult('subtract')}>Subtract</button>
            <button onClick={() => calculateResult('multiply')}>Multiply</button>
            <button onClick={() => calculateResult('divide')}>Divide</button>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {result !== null && <div>Result: {result}</div>}
        </div>
    );
};

export default App;