

import axios from 'axios';

class CalculatorService {
  constructor() {
    this.state = {
      calculation: '',
      result: '',
      decimalFormat: '0.00',
    };
  }

  calculate(e) {
    if (e) {
      e.preventDefault();
    }
    const { calculation } = this.state;
    const url = '/api/calculate';
    const data = { calculation };
    return axios.post(url, data)
      .then(response => {
        const result = response.data;
        this.setState({ result: result.toString() });
        return result;
      })
      .catch(error => console.error(error));
  }

  clear(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      calculation: '',
      result: '',
    });
  }

  getDecimalFormat() {
    return this.state.decimalFormat;
  }

  lockNumberValue(inputString) {
    if (!inputString || typeof inputString !== 'string') {
      throw new Error('Invalid input string');
    }
    const url = '/api/parse-input-string';
    const data = { inputString };
    return axios.post(url, data)
      .then(response => response.data)
      .catch(error => console.error(error));
  }
}

export default CalculatorService;