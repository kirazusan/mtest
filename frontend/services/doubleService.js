package frontend.services;

import axios from 'axios';

const API_URL = process.env.API_URL || '/api/double/trimmed';

export const getTrimmedDouble = async (value, format) => {
    if (typeof value !== 'number' || typeof format !== 'string') {
        throw new Error('Invalid input parameters');
    }
    
    try {
        const response = await axios.post(API_URL, {
            value,
            format
        });
        return response.data;
    } catch (error) {
        throw new Error(`API call failed: ${error.message}`);
    }
};