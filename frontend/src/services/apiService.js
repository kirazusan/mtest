package src.services;

import axios from 'axios';

const apiService = {
    fetchConfig: async () => {
        try {
            const response = await fetch('/api/config');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            throw new Error('Error fetching configuration: ' + error.message);
        }
    },

    fetchData: async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            throw new Error('Error fetching data from ' + endpoint + ': ' + error.message);
        }
    },

    postData: async (endpoint, data) => {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            throw new Error('Error posting data to ' + endpoint + ': ' + error.message);
        }
    }
};

export default apiService;