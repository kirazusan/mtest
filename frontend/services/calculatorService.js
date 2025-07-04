package frontend.services;

import axios from 'axios';

const validateNumber = (number) => typeof number === 'number' && !isNaN(number);
const validateOperation = (operation) => ['addition', 'subtraction', 'multiplication', 'division'].includes(operation);

export const calculateBasicOperation = async (number1, number2, operation) => {
    if (!validateNumber(number1) || !validateNumber(number2) || !validateOperation(operation)) {
        return { error: 'Invalid input parameters' };
    }
    try {
        const response = await axios.post('/api/calculator/calculate', {
            number1,
            number2,
            operation
        });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};

export const performCalculation = async (number1, number2, operation) => {
    if (!validateNumber(number1) || !validateNumber(number2) || !validateOperation(operation)) {
        return { error: 'Invalid input parameters' };
    }
    try {
        const response = await axios.post('/api/calculator/perform-calculation', {
            number1,
            number2,
            operation
        });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};

export const negateNumber = async (number) => {
    if (!validateNumber(number)) {
        return { error: 'Invalid input parameter' };
    }
    try {
        const response = await axios.post('/api/calculator/negate', {
            number
        });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'An error occurred' };
    }
};