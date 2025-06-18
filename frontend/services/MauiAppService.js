

import axios from 'axios';
import logger from '../logger';

const createValidationSchema = {
  type: 'object',
  required: ['name', 'description'],
  properties: {
    name: { type: 'string' },
    description: { type: 'string' }
  }
};

const validateData = (data) => {
  try {
    const isValid = data.name !== undefined && data.name !== null;
    const isNameValid = typeof data.name === 'string';
    const isDescriptionValid = typeof data.description === 'string';
    return isValid && isNameValid && isDescriptionValid;
  } catch (error) {
    return false;
  }
};

const MauiAppService = {
  createMauiApp: (data) => {
    try {
      if (validateData(data)) {
        axios.post('/api/maui-apps', data)
          .then(response => {
            if (response.status === 200) {
              return response.data;
            } else {
              logger.error(`Failed to create Maui App: ${response.statusText}`);
              Promise.reject(new Error(`Failed to create Maui App: ${response.statusText}`));
            }
          })
          .catch(error => {
            logger.error(`Failed to create Maui App: ${error}`);
            Promise.reject(new Error(`Failed to create Maui App: ${error}`));
          });
      } else {
        logger.error(`Failed to create Maui App: Validation failed`);
        Promise.reject(new Error(`Failed to create Maui App: Validation failed`));
      }
    } catch (error) {
      logger.error(`Failed to create Maui App: ${error}`);
      Promise.reject(new Error(`Failed to create Maui App: ${error}`));
    }
  }
};

export default MauiAppService;