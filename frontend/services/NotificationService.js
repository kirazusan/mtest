

import axios from 'axios';
import logger from '../utils/logger';

const apiEndpoint = '/api/notifications';

const getNotificationChannels = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    if (response.status !== 200) {
      throw new Error(`Non-200 status code: ${response.status}`);
    }
    const data = response.data;
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }
    return data;
  } catch (error) {
    logger.error('Error fetching notification channels:', error);
    throw error;
  }
};

const NotificationService = {
  getNotificationChannels,
};

export default NotificationService;