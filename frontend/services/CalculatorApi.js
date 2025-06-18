

import axios from 'axios';

class CalculatorApi {
  async calculate(data) {
    if (!data) {
      throw new Error('Data parameter is required');
    }

    try {
      const response = await axios.post('/api/calculate', data);
      return response.data;
    } catch (error) {
      throw new Error(`API call failed: ${error.message}`);
    }
  }
}

export default CalculatorApi;