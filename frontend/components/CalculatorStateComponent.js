

import React, { Component } from 'react';

class CalculatorStateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculatorState: {}
    };
  }

  componentDidMount() {
    fetch('/api/GetCalculatorState', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to retrieve calculator state');
      }
    })
    .then(data => {
      if (data && typeof data === 'object') {
        this.setState({ calculatorState: data });
      } else {
        throw new Error('Invalid calculator state data');
      }
    })
    .catch(error => {
      console.error('Error retrieving calculator state:', error);
    });
  }

  render() {
    return (
      <div>
        <h1>Calculator State</h1>
        <p>Current State: {JSON.stringify(this.state.calculatorState)}</p>
      </div>
    );
  }
}

export default CalculatorStateComponent;