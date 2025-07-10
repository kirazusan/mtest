package services;

import axios from 'axios';

const apiService = {
    createApp: async (appData) => {
        try {
            const response = await axios.post('/api/app', appData);
            return response.data;
        } catch (error) {
            console.error('Error creating app:', error.response ? error.response.data : error.message);
            throw new Error(error.response ? error.response.data : 'An error occurred while creating the app');
        }
    }
};

export default apiService;