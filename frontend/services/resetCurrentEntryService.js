

import axios from 'axios';

const resetCurrentEntryService = {
  resetCurrentEntry: async () => {
    try {
      const response = await axios.post('/api/reset-current-entry');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default resetCurrentEntryService;