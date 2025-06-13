

import fetch from 'isomorphic-unfetch';

/**
 * PermissionRequestsService handles API calls to the backend to fetch permission requests data.
 */
class PermissionRequestsService {
    /**
     * Constructor for PermissionRequestsService.
     * @param {string} baseUrl - The base URL for the backend API.
     * @throws {Error} If baseUrl is not provided.
     */
    constructor(baseUrl) {
        if (!baseUrl) {
            throw new Error('baseUrl is required');
        }
        this.baseUrl = baseUrl;
    }

    /**
     * Fetches permission requests data from the backend API.
     * @returns {Promise<object[]>} A promise resolving to an array of permission request objects.
     */
    async getPermissionRequests() {
        try {
            const response = await fetch(`${this.baseUrl}/permission-requests`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            try {
                return await response.json();
            } catch (error) {
                throw new Error('Failed to parse response as JSON');
            }
        } catch (error) {
            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error('Fetch API is not supported');
            }
            console.error(error);
            throw error;
        }
    }
}

export default PermissionRequestsService;