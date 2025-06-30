

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CalculatorComponent from './CalculatorComponent';
import StartButton from './StartButton';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false
    };
  }

  handleStart = () => {
    this.setState({ started: true });
    store.dispatch({ type: 'START_APPLICATION' });
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
          <Route path="/" exact>
            {this.state.started ? (
              <CalculatorComponent />
            ) : (
              <StartButton handleStart={this.handleStart} />
            )}
          </Route>
        </Switch>
      </Router>
    </Provider>
    );
  }
}

export default App;