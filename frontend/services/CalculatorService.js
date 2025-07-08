package frontend.services;

import axios from 'axios';

class CalculatorService {
    static async add(a, b) {
        this.validateInput(a, b);
        try {
            const response = await axios.post('/api/add', { a, b });
            return response.data.result;
        } catch (error) {
            this.handleError(error);
        }
    }

    static async subtract(a, b) {
        this.validateInput(a, b);
        try {
            const response = await axios.post('/api/subtract', { a, b });
            return response.data.result;
        } catch (error) {
            this.handleError(error);
        }
    }

    static async multiply(a, b) {
        this.validateInput(a, b);
        try {
            const response = await axios.post('/api/multiply', { a, b });
            return response.data.result;
        } catch (error) {
            this.handleError(error);
        }
    }

    static async divide(a, b) {
        this.validateInput(a, b);
        if (b === 0) {
            throw new Error('Division by zero is not allowed.');
        }
        try {
            const response = await axios.post('/api/divide', { a, b });
            return response.data.result;
        } catch (error) {
            this.handleError(error);
        }
    }

    static validateInput(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Invalid input: both a and b must be numbers.');
        }
    }

    static handleError(error) {
        console.error('API call failed:', error);
        throw new Error('An error occurred while processing your request.');
    }
}