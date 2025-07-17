import React, { useEffect, useState } from 'react';
import { ToTrimmedString } from '../utils/DoubleExtensions';
import { CalculatorService } from '../utils/CalculatorService';
import MainPage from '../MainPage/MainPage';

class MainApplication extends React.Component {
  constructor(handle, ownership) {
    super(handle, ownership);
    this.InitializeComponent();
    this.mainPage = new MainPage();
    this.state = {
      initializationMessage: null,
      calculationResult: null,
      errorMessage: null,
      inputValues: { num1: 0, num2: 0, operation: 'add' },
      calculationHistory: [],
      noHistoryMessage: null,
      successMessage: null,
    };
  }

  componentDidMount() {
    if (this.isMauiContext()) {
      MauiProgram.initializeReactApp();
    }
    this.initApplication();
    this.fetchCalculationHistory();
  }

  isMauiContext() {
    return typeof window !== 'undefined' && window.navigator.userAgent.includes('.NET MAUI');
  }

  InitializeComponent() {
    // Initialize application components
  }

  handleCalculate = (value1, value2, mathOperator) => {
    const result = CalculatorService.Calculate(value1, value2, mathOperator);
    this.setState({ calculationResult: result });
  };

  handleInitializeAppDelegate = () => {
    CalculatorService.initializeAppDelegate();
    this.setState({ initializationMessage: 'App Delegate Initialized' });
  };

  handleInitializeApp = () => {
    CalculatorService.initializeApp();
    this.setState({ initializationMessage: 'App Initialized' });
  };

  initApplication = () => {
    CalculatorService.initializeApplication();
    this.setState({ initializationMessage: 'Application Initialized' });
  };

  handleCalculation = (event) => {
    event.preventDefault();
    const { inputValues } = this.state;
    const { num1, num2, operation } = inputValues;
    const result = CalculatorService.performCalculation(num1, num2, operation);
    this.setState({ calculationResult: result, errorMessage: null });
  };

  fetchCalculationHistory = () => {
    const history = CalculatorService.getCalculationHistory();
    this.setState({ calculationHistory: history, noHistoryMessage: history.length === 0 ? 'No history available' : null });
  };

  handleClearHistory = () => {
    const response = CalculatorService.clearCalculationHistory();
    if (response.success) {
      this.setState({ successMessage: 'History cleared successfully', errorMessage: null });
    } else {
      this.setState({ errorMessage: 'Failed to clear history', successMessage: null });
    }
  };

  render() {
    const { initializationMessage, calculationResult, errorMessage, noHistoryMessage, calculationHistory } = this.state;
    return (
      <div>
        {initializationMessage && <div>{initializationMessage}</div>}
        {calculationResult !== null && <div>Result: {calculationResult}</div>}
        {errorMessage && <div>Error: {errorMessage}</div>}
        {noHistoryMessage && <div>{noHistoryMessage}</div>}
        <form onSubmit={this.handleCalculation}>
          <input type="number" value={this.state.inputValues.num1} onChange={(e) => this.setState({ inputValues: { ...this.state.inputValues, num1: Number(e.target.value) } })} />
          <input type="number" value={this.state.inputValues.num2} onChange={(e) => this.setState({ inputValues: { ...this.state.inputValues, num2: Number(e.target.value) } })} />
          <select value={this.state.inputValues.operation} onChange={(e) => this.setState({ inputValues: { ...this.state.inputValues, operation: e.target.value } })}>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
          <button type="submit">Calculate</button>
        </form>
        <button onClick={this.handleClearHistory}>Clear History</button>
        <table>
          <thead>
            <tr>
              <th>Num1</th>
              <th>Num2</th>
              <th>Operation</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {calculationHistory.map((entry, index) => (
              <tr key={index}>
                <td>{entry.num1}</td>
                <td>{entry.num2}</td>
                <td>{entry.operation}</td>
                <td>{entry.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}