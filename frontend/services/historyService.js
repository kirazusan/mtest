package frontend.services;

import axios from 'axios';

const API_ENDPOINT = '/api/history/clear';

export const clearHistory = async () => {
    if (!API_ENDPOINT) {
        throw new Error('Invalid API endpoint');
    }
    try {
        const response = await axios.post(API_ENDPOINT);
        if (response.status !== 200) {
            throw new Error('Failed to clear history: ' + response.statusText);
        }
        return response.data;
    } catch (error) {
        throw new Error('Error clearing history: ' + error.message);
    }
};

export const clearHistoryTests = () => {
    test('should clear history successfully', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 200, data: {} });
        const result = await clearHistory();
        expect(result).toEqual({});
    });

    test('should throw error on invalid endpoint', async () => {
        const originalEndpoint = API_ENDPOINT;
        API_ENDPOINT = '';
        await expect(clearHistory()).rejects.toThrow('Invalid API endpoint');
        API_ENDPOINT = originalEndpoint;
    });

    test('should throw error on non-200 response', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 500, statusText: 'Internal Server Error' });
        await expect(clearHistory()).rejects.toThrow('Failed to clear history: Internal Server Error');
    });

    test('should throw error on request failure', async () => {
        axios.post = jest.fn().mockRejectedValue(new Error('Network Error'));
        await expect(clearHistory()).rejects.toThrow('Error clearing history: Network Error');
    });
};