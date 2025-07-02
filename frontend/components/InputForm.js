package components;

import React, { useState } from 'react';
import { apiService } from '../services/apiService';

const InputForm = () => {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [operation, setOperation] = useState('add');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const validationError = apiService.validateInput(number1, number2);
        if (validationError) {
            setError(validationError);
            return;
        }
        const result = await apiService.calculate(number1, number2, operation);
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={number1}
                onChange={(e) => setNumber1(e.target.value)}
                placeholder="Number 1"
            />
            <input
                type="text"
                value={number2}
                onChange={(e) => setNumber2(e.target.value)}
                placeholder="Number 2"
            />
            <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
                <option value="multiply">Multiply</option>
                <option value="divide">Divide</option>
            </select>
            <button type="submit">Submit</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default InputForm;