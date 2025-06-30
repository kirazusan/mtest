

import axios from 'axios';

class CalculatorService {
  async getButtonText() {
    try {
      const response = await axios.get('/api/GetButtonText');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get button text: ${error.message}`);
    }
  }

  async toTrimmedString(value, format) {
    if (typeof value !== 'number' || typeof format !== 'string') {
      throw new Error('Invalid input parameters');
    }

    try {
      const response = await axios.get(`/api/ToTrimmedString?value=${value}&format=${format}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to trim string: ${error.message}`);
    }
  }
}

export default CalculatorService;