

import React, { Component } from 'react';
import axios from 'axios';

class CalculationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCalculation: ''
    };
  }

  componentDidMount() {
    this.getCurrentCalculation();
  }

  getCurrentCalculation = () => {
    axios.get('/api/GetCurrentCalculation')
      .then(response => {
        this.setState({ currentCalculation: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <p>Current Calculation: {this.state.currentCalculation}</p>
      </div>
    );
  }
}

export default CalculationComponent;