package services;

import axios from 'axios';

const API_URL = 'https://your-backend-endpoint.com/api';

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
};

export const validateInput = async (inputData) => {
    try {
        const response = await axios.post(`${API_URL}/validate`, inputData);
        return response.data;
    } catch (error) {
        throw new Error(`Error validating input: ${error.message}`);
    }
};