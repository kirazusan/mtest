import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CalculatorScreen from './components/CalculatorScreen/Calculator';

class MauiApplication {
  constructor() {
    // Initialize properties for application lifecycle
  }

  initialize() {
  }

  configure() {
  }

  shutdown() {
  }
}

class MainActivity extends React.Component {
  constructor() {
    super();
  }

  createMauiApp() {
    return MauiProgram.CreateMauiApp();
  }

  componentDidMount() {
    this.createMauiApp();
  }

  static Main(args) {
    UIApplication.Main(args, null, AppDelegate);
  }

  static Main(args) {
    Program.Main(args);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/calculator" component={CalculatorScreen} />
        </Switch>
      </Router>
    );
  }
}

export default MainActivity;