

import axios from 'axios';

class CalculatorService {
  constructor(resultText) {
    this.resultText = resultText;
    this.firstNumber = '';
    this.secondNumber = '';
    this.operation = '';
  }

  calculate() {
    if (this.secondNumber === '0' && (this.operation === 'divide' || this.operation === 'multiply')) {
      this.resultText.textContent = 'Error: Division by zero is not allowed';
      return;
    }

    const calculationData = {
      firstNumber: this.firstNumber,
      secondNumber: this.secondNumber,
      operation: this.operation,
    };

    axios.post('/api/calculate', calculationData)
      .then((response) => {
        this.resultText.textContent = response.data.result;
        this.LockNumberValue(this.resultText.textContent);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onClear() {
    this.firstNumber = '';
    this.secondNumber = '';
    this.operation = '';
    this.resultText.textContent = '0';
  }

  add() {
    this.operation = 'add';
    this.calculate();
  }

  subtract() {
    this.operation = 'subtract';
    this.calculate();
  }

  multiply() {
    this.operation = 'multiply';
    this.calculate();
  }

  divide() {
    this.operation = 'divide';
    this.calculate();
  }

  LockNumberValue(value) {
    if (value.includes('.')) {
      this.resultText.textContent = parseFloat(value).toFixed(2);
    } else {
      this.resultText.textContent = parseInt(value);
    }
  }

  validateInput(value) {
    if (isNaN(value)) {
      this.resultText.textContent = 'Error: Invalid input';
      return false;
    }
    return true;
  }
}

export default CalculatorService;