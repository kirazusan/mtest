

import axios from 'axios';
import logger from '../logger';

const getCurrentCalculation = async () => {
  try {
    const response = await axios.get('/GetCurrentCalculation');
    if (response.data === null || response.data === undefined) {
      logger.error('API response data is null or undefined');
      throw new Error('API response data is null or undefined');
    }
    return response.data;
  } catch (error) {
    logger.error('Error fetching current calculation:', error);
    throw error;
  }
};

export default getCurrentCalculation;