

import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld';
import HelloWorldService from './HelloWorldService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  async render() {
    const response = await HelloWorldService.getMessage();
    this.setState({ message: response });
    return (
      <div>
        <HelloWorld message={this.state.message} />
        <p>Hello World!</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));