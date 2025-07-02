package frontend.services;

import axios from 'axios';

class CalculatorService {
    async performCalculation(calculationRequest) {
        if (!calculationRequest || typeof calculationRequest !== 'object') {
            throw new Error('Invalid calculation request.');
        }
        try {
            const response = await axios.post('/api/calculate', calculationRequest);
            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : 'An error occurred while performing the calculation.');
        }
    }

    async validateInput(numbers, operationType) {
        if (!Array.isArray(numbers) || numbers.length !== 2 || typeof operationType !== 'string') {
            throw new Error('Invalid input parameters. Expected two numbers and an operation type.');
        }
        try {
            const response = await axios.post('/api/validate', { numbers, operationType });
            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : 'An error occurred while validating the input.');
        }
    }
}

export default new CalculatorService();