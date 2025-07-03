package frontend.services;

import axios from 'axios';

export const calculate = async (value1, value2, mathOperator, number1, number2) => {
    try {
        const response = await axios.post('/api/calculator/calculate', {
            value1,
            value2,
            mathOperator,
            number1,
            number2
        });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};