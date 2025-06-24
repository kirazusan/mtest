

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class CalculatorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '',
      operator: '',
      result: ''
    };
  }

  handleOperatorClick = (operator) => {
    if (this.state.currentValue === '') {
      console.error('Current value is empty');
      return;
    }

    if (!['+', '-', '*', '/'].includes(operator)) {
      console.error('Invalid operator');
      return;
    }

    axios.post('/calculate', {
      currentValue: this.state.currentValue,
      operator: operator
    })
    .then(response => {
      if (response.data) {
        this.setState({ result: response.data });
      } else {
        console.error('No result received from backend');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  handleInputChange = (event) => {
    this.setState({ currentValue: event.target.value });
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.currentValue} onChange={this.handleInputChange} />
        <button onClick={() => this.handleOperatorClick('+')}>+</button>
        <button onClick={() => this.handleOperatorClick('-')}>-</button>
        <button onClick={() => this.handleOperatorClick('*')}>*</button>
        <button onClick={() => this.handleOperatorClick('/')}>/</button>
        <p>Current Value: {this.state.currentValue}</p>
        <p>Result: {this.state.result}</p>
      </div>
    );
  }
}

CalculatorComponent.propTypes = {
  result: PropTypes.string
};

export default CalculatorComponent;