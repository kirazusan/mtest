package frontend.services;

import axios from 'axios';

export const calculate = async (calculationRequest) => {
    try {
        const response = await axios.post('/api/calculator/calculate', calculationRequest);
        return response.data;
    } catch (error) {
        return { error: 'Error performing calculation: ' + error.message };
    }
};

export const getTrimmedString = async (value, format) => {
    try {
        const response = await axios.post('/api/calculator/trim', { value, format });
        return response.data;
    } catch (error) {
        return { error: 'Error getting trimmed string: ' + error.message };
    }
};