import { MauiApp } from 'maui-framework';
import { App } from './App';

export class MauiAppService {
  static createMauiApp() {
    const builder = MauiApp.createBuilder();
    builder.useMauiApp(App);
    builder.configureFonts(() => {
      builder.addFont('OpenSans-Regular');
      builder.addFont('OpenSans-Semibold');
    });
    return builder.build();
  }

  static async initializeCalculator() {
    try {
      return 'Calculator initialized successfully';
    } catch (error) {
      return 'Error initializing calculator: ' + error.message;
    }
  }

  static async performCalculation(input) {
    try {
      const { operation, operands } = input;
      if (!['add', 'subtract', 'multiply', 'divide'].includes(operation) || !Array.isArray(operands) || operands.some(op => typeof op !== 'number')) {
        throw new Error('Invalid input: Please ensure the operation type is valid and operands are numbers.');
      }
      let result;
      switch (operation) {
        case 'add':
          result = operands.reduce((a, b) => a + b, 0);
          break;
        case 'subtract':
          result = operands.reduce((a, b) => a - b);
          break;
        case 'multiply':
          result = operands.reduce((a, b) => a * b, 1);
          break;
        case 'divide':
          result = operands.reduce((a, b) => a / b);
          break;
      }
      return result;
    } catch (error) {
      return 'Error performing calculation: ' + error.message;
    }
  }

  static async getAvailableFonts() {
    try {
      const response = await fetch('/api/fonts');
      if (!response.ok) {
        throw new Error('Failed to fetch fonts');
      }
      const fonts = await response.json();
      return fonts;
    } catch (error) {
      return 'Error retrieving fonts: ' + error.message;
    }
  }
}