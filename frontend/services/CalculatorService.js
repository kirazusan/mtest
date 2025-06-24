

package frontend.services;

import axios from 'axios';

export default class CalculatorService {
    calculate(firstNumber, secondNumber, mathOperator) {
        if (!['+', '-', '*', '/'].includes(mathOperator)) {
            throw new Error('Invalid math operator');
        }
        let result = 0;
        switch (mathOperator) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '/':
                if (secondNumber === 0) {
                    throw new Error('Cannot divide by zero');
                }
                result = firstNumber / secondNumber;
                break;
            default:
                break;
        }
        return result;
    }

    calculate(currentEntry, resultText) {
        if (['+', '-', '*', '/'].includes(currentEntry)) {
            const firstNumber = resultText;
            const secondNumber = 0;
            const mathOperator = currentEntry;
            return this.calculate(firstNumber, secondNumber, mathOperator);
        } else {
            const firstNumber = resultText;
            const secondNumber = currentEntry;
            const mathOperator = '+';
            return this.calculate(firstNumber, secondNumber, mathOperator);
        }
    }

    async updateCalculatorState(firstNumber, secondNumber, mathematicalOperator, currentCalculation) {
        try {
            const response = await axios.post('/UpdateCalculatorState', {
                firstNumber,
                secondNumber,
                mathematicalOperator,
                currentCalculation
            });
            if (!response.data || !response.data.success) {
                throw new Error('Invalid response from backend');
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async lockNumberValue() {
        try {
            const response = await axios.post('/lockNumberValue');
            if (!response.data || !response.data.success) {
                throw new Error('Invalid response from backend');
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getResultText() {
        try {
            const response = await axios.get('/getResultText');
            if (!response.data || !response.data.success) {
                throw new Error('Invalid response from backend');
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}