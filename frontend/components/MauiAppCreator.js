

package frontend.components;

import { Component, createElement } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import App from './App';
import { createMauiApp } from './mauiApp';

class MauiAppCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      root: null
    };
  }

  componentDidMount() {
    const mauiApp = createMauiApp();
    this.setState({ root: mauiApp.root });
  }

  render() {
    return (
      <Provider store={store}>
        <div id="maui-app-container">
          {this.state.root}
        </div>
      </Provider>
    );
  }
}

export default MauiAppCreator;