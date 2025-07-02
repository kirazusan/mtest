package services;

import axios from 'axios';

class NumberService {
    async formatDouble(value, format) {
        if (typeof value !== 'number' || isNaN(value)) {
            throw new Error('Invalid value: must be a number');
        }
        if (typeof format !== 'string' || format.trim() === '') {
            throw new Error('Invalid format: must be a non-empty string');
        }
        try {
            const response = await axios.post('/api/formatDouble', { value, format });
            if (response.data && response.data.formattedValue) {
                return response.data.formattedValue;
            } else {
                throw new Error('Unexpected response structure from backend');
            }
        } catch (error) {
            throw new Error(`Error formatting double value: ${error.message}`);
        }
    }
}

export default new NumberService();