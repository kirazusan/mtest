package services;

import axios from 'axios';

export const initApp = async () => {
    try {
        const response = await axios.post('/api/app/init');
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error('Endpoint not found');
            } else if (error.response.status === 500) {
                throw new Error('Server error occurred');
            }
            throw new Error(error.response.data);
        }
        throw new Error('An error occurred while initializing the app');
    }
};