import React, { useState, useEffect } from 'react';
import { Program } from '../../../Calculator/Platforms/iOS/Program';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.isMainActivity = true;
    this.state = {
      calculationResult: null,
      value1: 0,
      value2: 0,
      formattedValue: '',
    };
  }

  componentDidMount() {
    Program.Main(process.argv);
  }

  toTrimmedString(target, decimalFormat) {
    let strValue = target.toString(decimalFormat);
    if (strValue.includes('.')) {
      strValue = strValue.trimEnd('0');
    }
    if (strValue.endsWith('.')) {
      strValue = strValue.trimEnd('.');
    }
    return strValue;
  }

  formatDouble = (target, decimalFormat) => {
    const formatted = DoubleExtensions.ToTrimmedString(target, decimalFormat);
    this.setState({ formattedValue: formatted });
  };

  handleCalculate = (value1, value2, mathOperator) => {
    const result = Calculator.Calculate(value1, value2, mathOperator);
    this.setState({ calculationResult: result });
  };

  render() {
    return (
      <div>
        {this.isMainActivity ? (
          <div>
            <input
              type="number"
              value={this.state.value1}
              onChange={(e) => this.setState({ value1: parseFloat(e.target.value) })}
            />
            <input
              type="number"
              value={this.state.value2}
              onChange={(e) => this.setState({ value2: parseFloat(e.target.value) })}
            />
            <button onClick={() => this.handleCalculate(this.state.value1, this.state.value2, '+')}>
              Calculate
            </button>
            <div>Result: {this.state.calculationResult}</div>
          </div>
        ) : (
          <div>
            {/* Render alternative UI elements */}
          </div>
        )}
      </div>
    );
  }
}

const App = () => {
  useEffect(() => {
    const initializeApp = () => {
      console.log('AppDelegate constructor initialized');
    };
    initializeApp();
  }, []);

  return <MainPage />;
};

const AppDelegate = () => {
  useEffect(() => {
    // Initialization logic can go here
  }, []);

  return <MainPage />;
};

export { App, AppDelegate, MainPage };