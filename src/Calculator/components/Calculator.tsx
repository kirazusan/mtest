import React, { Component } from 'react';
import { CalculatorService } from '../services/CalculatorService';
import { MainPage } from './MainPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activityState: 'active',
      calculatorState: null,
      calculationResult: '',
      percentageResult: '',
      supportedOperations: [],
      fontConfig: { fonts: [] },
      version: null,
      configurationStatus: '',
      message: ''
    };
    this.InitializeComponent();
    this.MainPage = new MainPage();
  }

  componentDidMount() {
    window.addEventListener('onStart', this.handleActivityLifecycle);
    window.addEventListener('onResume', this.handleActivityLifecycle);
    window.addEventListener('onPause', this.handleActivityLifecycle);
    window.addEventListener('onStop', this.handleActivityLifecycle);
    window.addEventListener('onDestroy', this.handleActivityLifecycle);
    this.initializeCalculator();
    this.getSupportedOperations();
    this.getCalculatorVersion();
  }

  componentWillUnmount() {
    window.removeEventListener('onStart', this.handleActivityLifecycle);
    window.removeEventListener('onResume', this.handleActivityLifecycle);
    window.removeEventListener('onPause', this.handleActivityLifecycle);
    window.removeEventListener('onStop', this.handleActivityLifecycle);
    window.removeEventListener('onDestroy', this.handleActivityLifecycle);
  }

  handleActivityLifecycle = () => {
    const event = window.event.type;
    if (event === 'onResume') {
      this.setState({ activityState: 'active' });
    } else if (event === 'onPause') {
      this.setState({ activityState: 'background' });
    } else if (event === 'onStart') {
      this.setState({ activityState: 'active' });
    } else if (event === 'onStop') {
      this.setState({ activityState: 'background' });
    }
  };

  initializeCalculator = async () => {
    try {
      const state = await CalculatorService.initializeCalculator();
      this.setState({ calculatorState: state });
    } catch (error) {
      console.error(error);
    }
  };

  handleCalculation = async (operation, operands) => {
    try {
      const result = await CalculatorService.performCalculation(operation, operands);
      this.setState({ calculationResult: result });
    } catch (error) {
      console.error(error);
    }
  };

  handleCalculatePercentage = async (value, percentage) => {
    try {
      const result = await CalculatorService.calculatePercentage(value, percentage);
      this.setState({ percentageResult: result });
    } catch (error) {
      console.error(error);
    }
  };

  getSupportedOperations = async () => {
    try {
      const operations = await CalculatorService.getSupportedOperations();
      this.setState({ supportedOperations: operations });
    } catch (error) {
      console.error(error);
    }
  };

  handleConfigureFonts = async () => {
    try {
      const response = await CalculatorService.configureFonts(this.state.fontConfig);
      this.setState({ configurationStatus: 'success', message: response.message });
    } catch (error) {
      this.setState({ configurationStatus: 'failure', message: error.message });
    }
  };

  getCalculatorVersion = async () => {
    try {
      const version = await CalculatorService.getCalculatorVersion();
      this.setState({ version });
    } catch (error) {
      console.error(error);
    }
  };

  InitializeComponent() {}

  render() {
    return (
      <div>
        <MainPage />
        {this.state.version ? <div>Version: {this.state.version}</div> : <div>Loading version...</div>}
      </div>
    );
  }
}

export default App;