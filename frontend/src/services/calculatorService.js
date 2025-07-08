package frontend.src.services;

import axios from 'axios';

const API_URL = '/api/calculator';

export const calculatorService = {
    calculate
};

async function calculate(data) {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        throw new Error('Error performing calculation: ' + error.message);
    }
}