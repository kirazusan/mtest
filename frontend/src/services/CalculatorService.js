package services;

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api/calculator/calculate';

export const calculate = async (value1, value2, mathOperator) => {
    if (typeof value1 !== 'number' || typeof value2 !== 'number' || typeof mathOperator !== 'string') {
        throw new Error('Invalid input parameters');
    }

    try {
        const response = await axios.post(API_URL, {
            value1,
            value2,
            mathOperator
        });
        return response.data;
    } catch (error) {
        throw new Error('Error during API call: ' + error.message);
    }
};