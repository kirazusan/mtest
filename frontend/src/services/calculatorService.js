package;

import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://your-backend-url.com/api',
    timeout: 1000,
});

const validOperators = ['+', '-', '*', '/'];

export const calculate = async (operand1, operand2, operator) => {
    if (typeof operand1 !== 'number' || typeof operand2 !== 'number' || !validOperators.includes(operator)) {
        throw new Error('Invalid input parameters');
    }
    try {
        const response = await apiClient.post('/calculate', {
            operand1,
            operand2,
            operator,
        });
        return response.data;
    } catch (error) {
        throw new Error('Error in API request: ' + error.message);
    }
};