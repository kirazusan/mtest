

import axios from 'axios';

class CurrentStateService {
  async updateCurrentState(data) {
    try {
      const response = await axios.post('/UpdateCurrentState', data);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Error updating current state: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
}

export default CurrentStateService;