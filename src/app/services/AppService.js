import fetch from 'node-fetch';

class AppService {
  static calculate(input) {
    if (typeof input !== 'object' || input === null) {
      return 'Input must be a JSON object.';
    }
    const { number1, number2, operator } = input;
    if (number1 === undefined || number2 === undefined) {
      return 'Both numbers must be provided.';
    }
    if (!['addition', 'subtraction', 'multiplication', 'division'].includes(operator)) {
      return 'Invalid operator. Allowed operators are addition, subtraction, multiplication, division.';
    }
    if (operator === 'division' && number2 === 0) {
      return 'Error: Division by zero.';
    }
    switch (operator) {
      case 'addition':
        return number1 + number2;
      case 'subtraction':
        return number1 - number2;
      case 'multiplication':
        return number1 * number2;
      case 'division':
        return number1 / number2;
      default:
        return 'Invalid operation.';
    }
  }

  static async getAvailableFonts() {
    try {
      const response = await fetch('/api/fonts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return `Error fetching fonts: ${error.message}`;
    }
  }

  static async getSupportedOperations() {
    try {
      const response = await fetch('/api/operations');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return `Error fetching operations: ${error.message}`;
    }
  }
}

export default AppService;