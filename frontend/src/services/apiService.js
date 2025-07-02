package src.services;

import axios from 'axios';

class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.api = axios.create({
            baseURL: this.baseURL,
        });
    }

    async createMauiApp() {
        try {
            const response = await this.api.get('/initialize');
            return { data: response.data, error: null };
        } catch (error) {
            return { data: null, error: error.response ? error.response.data : 'An error occurred while initializing the application' };
        }
    }

    async fetchWithFetch(url) {
        try {
            const response = await fetch(`${this.baseURL}${url}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return { data, error: null };
        } catch (error) {
            return { data: null, error: error.message };
        }
    }
}

export default new ApiService('http://your-backend-url.com');