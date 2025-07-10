package services;

import axios from 'axios';

export const formatNumber = async (number, format) => {
    if (typeof number !== 'number' || typeof format !== 'string') {
        throw new Error('Invalid input parameters');
    }
    try {
        const response = await axios.post('/api/number/format', { number, format });
        return response.data;
    } catch (error) {
        throw new Error('Error formatting number: ' + error.message);
    }
};