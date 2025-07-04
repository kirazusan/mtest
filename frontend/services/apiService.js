package frontend.services;

import axios from 'axios';

const validateInput = (number, percentage) => {
    return typeof number === 'number' && typeof percentage === 'number';
};

const handleError = (error) => {
    if (error.response) {
        return { error: error.response.data.message || 'An error occurred' };
    }
    return { error: error.message };
};

export const calculatePercentage = async (number, percentage) => {
    if (!validateInput(number, percentage)) {
        return { error: 'Invalid input types. Both number and percentage must be numbers.' };
    }
    try {
        const response = await axios.post('/api/calculator/calculatePercentage', {
            number,
            percentage
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};