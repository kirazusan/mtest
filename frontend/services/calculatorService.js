package frontend.services;

import axios from 'axios';

const API_URL = 'https://your-backend-api.com/calculate';

const sendCalculationRequest = async (operation, num1, num2) => {
    if (num1 === null || num2 === null) {
        throw new Error('Input values cannot be null');
    }
    if (operation === 'divide' && num2 === 0) {
        throw new Error('Division by zero is not allowed');
    }
    const response = await axios.post(API_URL, { operation, num1, num2 });
    return response.data;
};

export const add = (num1, num2) => sendCalculationRequest('add', num1, num2);
export const subtract = (num1, num2) => sendCalculationRequest('subtract', num1, num2);
export const multiply = (num1, num2) => sendCalculationRequest('multiply', num1, num2);
export const divide = (num1, num2) => sendCalculationRequest('divide', num1, num2);