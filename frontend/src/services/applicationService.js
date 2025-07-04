package frontend.src.services;

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/api/applications';

export const createApp = async (appData) => {
    try {
        const response = await axios.post(API_URL, appData);
        return response.data;
    } catch (error) {
        console.error('Error creating application:', error);
        throw new Error('Error creating application: ' + error.message);
    }
};