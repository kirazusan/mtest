

import axios from 'axios';
import logger from '../logger';

class Calculate {
  async calculate(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid input data');
    }

    try {
      const response = await axios.post('/api/calculate', data);

      if (response.status !== 200) {
        throw new Error(`API request failed with status code ${response.status}`);
      }

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response data');
      }

      logger.info('Calculation successful');
      return response.data;
    } catch (error) {
      logger.error('Error during calculation:', error);
      throw error;
    }
  }
}

export default Calculate;