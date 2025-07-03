package frontend;

import axios from 'axios';

export const clearHistory = async () => {
    try {
        const response = await axios.delete('/api/history');
        return response.data;
    } catch (error) {
        throw new Error('Error clearing history: ' + error.message);
    }
};