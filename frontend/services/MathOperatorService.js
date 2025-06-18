

import axios from 'axios';

/**
 * New service class for math operator operations.
 */
class MathOperatorService {
  /**
   * Updates the math operator by making a PUT request to the backend API.
   * 
   * @param {string} mathOperator - The new math operator to update.
   * @returns {Promise<object>} A promise resolving to the updated math operator data.
   */
  async updateMathOperator(mathOperator) {
    if (typeof mathOperator !== 'string') {
      throw new Error('Math operator must be a string');
    }

    try {
      const response = await axios.put('/api/math-operator', { mathOperator });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update math operator: ${error.message}`);
    }
  }
}

export default MathOperatorService;