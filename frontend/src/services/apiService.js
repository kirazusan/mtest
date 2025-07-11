package services;

import axios from 'axios';

export const formatNumber = async (value, format) => {
    try {
        const response = await axios.post('/api/numberformatter/trimmedstring', { value, format });
        return response.data;
    } catch (error) {
        throw new Error('Error formatting number: ' + error.message);
    }
};

export const fetchConfigurationAndApplicationData = async () => {
    try {
        const [configResponse, appDataResponse] = await Promise.all([
            axios.get('/api/configuration'),
            axios.get('/api/applicationdata')
        ]);
        return {
            configuration: configResponse.data,
            applicationData: appDataResponse.data
        };
    } catch (error) {
        throw new Error('Error fetching configuration and application data: ' + error.message);
    }
};

export const calculate = async (calculationRequest) => {
    try {
        const response = await axios.post('/api/calculate', calculationRequest);
        return response.data;
    } catch (error) {
        throw new Error('Error performing calculation: ' + error.message);
    }
};