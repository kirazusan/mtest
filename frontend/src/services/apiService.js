package services;

import axios from 'axios';

const validateAppData = (appData) => {
    if (!appData.name || typeof appData.name !== 'string') {
        throw new Error('Invalid app name');
    }
    if (!appData.version || typeof appData.version !== 'string') {
        throw new Error('Invalid app version');
    }
    // Add more validation as needed
};

export const createApp = async (appData) => {
    validateAppData(appData);
    try {
        const response = await axios.post('/api/application/create', appData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'An error occurred while creating the application');
    }
};