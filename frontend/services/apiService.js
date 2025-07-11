package frontend.services;

import axios from 'axios';

export const initializeApp = async () => {
    try {
        const response = await axios.get('/api/initialize');
        if (!response.data || typeof response.data !== 'object') {
            throw new Error('Invalid response data');
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Axios error: ' + error.message);
        } else {
            throw new Error('Error initializing application: ' + error.message);
        }
    }
};