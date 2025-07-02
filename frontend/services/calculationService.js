package frontend.services;

import axios from 'axios';

class CalculationService {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint || '/api/calculate';
    }

    validateRequest(calculationRequest) {
        if (!calculationRequest || typeof calculationRequest !== 'object') {
            throw new Error('Invalid calculation request');
        }
        // Additional validation logic can be added here
    }

    async performCalculation(calculationRequest) {
        this.validateRequest(calculationRequest);
        try {
            const response = await axios.post(this.apiEndpoint, calculationRequest);
            return response.data;
        } catch (error) {
            if (error.response) {
                return { error: error.response.data.message || 'An error occurred' };
            } else if (error.request) {
                return { error: 'No response received from the server' };
            } else {
                return { error: 'Network error or server is down' };
            }
        }
    }
}

export default new CalculationService();