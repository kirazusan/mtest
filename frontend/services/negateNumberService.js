package frontend.services;

import axios from 'axios';

export const negateNumber = async (number) => {
    if (typeof number !== 'number' || isNaN(number)) {
        return { error: 'Invalid input: not a number' };
    }
    try {
        const response = await axios.post('/api/negate', { number });
        if (response.data && typeof response.data.negatedNumber === 'number') {
            return response.data.negatedNumber;
        } else {
            return { error: 'Invalid response format' };
        }
    } catch (error) {
        if (error.response) {
            return { error: 'Server responded with an error' };
        } else if (error.request) {
            return { error: 'Network error: request was made but no response received' };
        } else {
            return { error: error.message };
        }
    }
};