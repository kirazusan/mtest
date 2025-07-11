package services;

import axios from 'axios';

class CalculatorService {
    async calculate(value1, value2, mathOperator) {
        try {
            const response = await axios.post('/api/calculate', {
                value1,
                value2,
                mathOperator
            });
            if (response.data && response.data.result !== undefined) {
                return response.data.result;
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            throw new Error(`API call failed: ${error.message}`);
        }
    }
}

export default new CalculatorService();