package frontend.services;

import axios from 'axios';

class AppService {
    static async initializeApp(setAppState) {
        try {
            const response = await axios.get('/api/app/setup');
            setAppState(response.data);
        } catch (error) {
            throw new Error('Failed to initialize app: ' + error.message);
        }
    }
}

export default AppService;