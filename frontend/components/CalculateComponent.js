

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CalculateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNumber: '',
      secondNumber: '',
      operator: '',
      result: '',
      error: null,
      isLoading: false
    };
  }

  handleCalculate = (event) => {
    event.preventDefault();
    const { firstNumber, secondNumber, operator } = this.state;
    if (!firstNumber || !secondNumber || !operator) {
      this.setState({ error: 'Please fill in all fields' });
      return;
    }
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      this.setState({ error: 'Please enter valid numbers' });
      return;
    }
    this.setState({ isLoading: true, error: null });
    fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstNumber, secondNumber, operator })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => this.setState({ result: data.result, isLoading: false }))
      .catch(error => this.setState({ error: error.message, isLoading: false }));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleCalculate}>
        <label>
          First Number:
          <input
            type="number"
            name="firstNumber"
            value={this.state.firstNumber}
            onChange={this.handleChange}
            aria-label="First Number"
            aria-required="true"
          />
        </label>
        <label>
          Second Number:
          <input
            type="number"
            name="secondNumber"
            value={this.state.secondNumber}
            onChange={this.handleChange}
            aria-label="Second Number"
            aria-required="true"
          />
        </label>
        <label>
          Operator:
          <select
            name="operator"
            value={this.state.operator}
            onChange={this.handleChange}
            aria-label="Operator"
            aria-required="true"
          >
            <option value="">Select Operator</option>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
        </label>
        <button type="submit" disabled={this.state.isLoading}>
          Calculate
        </button>
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        <p>Result: {this.state.result}</p>
      </form>
    );
  }
}

CalculateComponent.propTypes = {
  firstNumber: PropTypes.string,
  secondNumber: PropTypes.string,
  operator: PropTypes.string,
  result: PropTypes.string,
  error: PropTypes.string,
  isLoading: PropTypes.bool
};

export default CalculateComponent;