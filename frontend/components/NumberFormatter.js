package frontend.components;

import React, { useState } from 'react';

const NumberFormatter = () => {
    const [number, setNumber] = useState('');
    const [format, setFormat] = useState('');
    const [result, setResult] = useState('');

    const formatNumber = () => {
        const formattedNumber = new Intl.NumberFormat('en-US', { 
            minimumFractionDigits: format.split('.')[1]?.length || 0, 
            maximumFractionDigits: format.split('.')[1]?.length || 20 
        }).format(parseFloat(number));
        setResult(formattedNumber);
    };

    return (
        <div>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a number"
            />
            <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                placeholder="Enter format string"
            />
            <button onClick={formatNumber}>Format Number</button>
            <div>Formatted Result: {result}</div>
        </div>
    );
};

export default NumberFormatter;