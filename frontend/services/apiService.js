package frontend.services;

import axios from 'axios';

export const initializeApp = async () => {
    try {
        const response = await axios.get('/api/maui-app');
        if (!response.data || typeof response.data !== 'object') {
            throw new Error('Invalid response structure');
        }
        return response.data;
    } catch (error) {
        throw new Error('Error initializing app: ' + error.message);
    }
};