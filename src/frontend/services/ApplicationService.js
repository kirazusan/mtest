

package src/frontend/services;

import axios from 'axios';

class ApplicationService {
    async startApplication(applicationId) {
        if (!applicationId || typeof applicationId !== 'string') {
            throw new Error('Invalid applicationId');
        }

        try {
            const response = await axios.post(`/api/applications/${applicationId}/start`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to start application: ${error.message}`);
        }
    }
}

export default ApplicationService;