package frontend.services;

import axios from 'axios';

class NumberService {
    async formatNumber(value, format) {
        try {
            const response = await axios.post('/api/formatNumber', {
                value: value,
                format: format
            });
            return response.data;
        } catch (error) {
            throw new Error('Error formatting number: ' + error.message);
        }
    }
}

export default new NumberService();