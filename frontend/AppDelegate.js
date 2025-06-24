

import React from 'react';
import ReactDOM from 'react-dom';

class AppDelegate {
  constructor() {
    this.applicationDidFinishLaunching = this.applicationDidFinishLaunching.bind(this);
  }

  applicationDidFinishLaunching() {
    ReactDOM.render(<App />, document.getElementById('root'));
  }
}

class App extends React.Component {
  render() {
    return <div>Hello World!</div>;
  }
}

const delegate = new AppDelegate();
delegate.applicationDidFinishLaunching();